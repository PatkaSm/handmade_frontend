import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import {
  deleteErrorMessage,
  deleteMessage,
  loadDataError,
} from 'src/app/core/consts/messages';
import { IPost } from 'src/app/core/interfaces/post.interfaces';
import { AuthService } from 'src/app/core/services/auth.service';
import { ChatService } from 'src/app/core/services/chat.service';
import { ForumService } from 'src/app/core/services/forum.service';
import { LoadingSpinnerService } from 'src/app/shared/loading-spinner/loading-spinner.service';
import { ModalService } from 'src/app/shared/modal/modal.service';
import { NotificationService } from 'src/app/shared/notification/notification.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss'],
})
export class PostDetailsComponent {
  post: IPost;
  id: number;
  subscription: Subscription = new Subscription();
  modalID = (this.modalService.generatedId + 312).toString();
  threadID: number;

  constructor(
    private notificationService: NotificationService,
    private loadingSpinnerService: LoadingSpinnerService,
    private forumService: ForumService,
    public activatedRoute: ActivatedRoute,
    public modalService: ModalService,
    public authService: AuthService,
    private chatService: ChatService
  ) {
    const param$ = activatedRoute.params.subscribe((param) => {
      this.id = param.id;
      this.getPost();
    });
    this.subscription.add(param$);
  }

  getPost() {
    this.loadingSpinnerService.setLoaderValue(true);
    this.forumService
      .getPostDetails(this.id)
      .pipe(
        finalize(() => {
          this.loadingSpinnerService.setLoaderValue(false);
        })
      )
      .subscribe(
        (resp) => {
          this.post = resp;
          if (this.authService.isLogged) {
            this.getUserThread();
          }
        },
        () => {
          this.notificationService.send.error(loadDataError);
        }
      );
  }

  deletePost() {
    this.forumService.deletePost(this.post.id).subscribe(
      () => {
        this.notificationService.send.success(deleteMessage('ogłoszenie'));
        this.modalService.close(this.modalID);
      },
      () => {
        this.notificationService.send.error(deleteErrorMessage('ogłoszenia'));
      }
    );
  }

  getUserThread() {
    this.chatService.getUserThread(this.post.owner.id).subscribe(
      (resp) => {
        this.threadID = resp.id;
      },
      (error) => {
        this.notificationService.send.error('Nie udało się pobrać danych ');
      }
    );
  }
}

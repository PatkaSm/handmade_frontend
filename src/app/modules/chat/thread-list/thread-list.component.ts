import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { loadDataError } from 'src/app/core/consts/messages';
import { IMessage, IThread } from 'src/app/core/interfaces/chat.interface';
import { AuthService } from 'src/app/core/services/auth.service';
import { ChatService } from 'src/app/core/services/chat.service';
import { LoadingSpinnerService } from 'src/app/shared/loading-spinner/loading-spinner.service';
import { NotificationService } from 'src/app/shared/notification/notification.service';

@Component({
  selector: 'app-thread-list',
  templateUrl: './thread-list.component.html',
  styleUrls: ['./thread-list.component.scss'],
})
export class ThreadListComponent {
  threads: IThread[];
  threadID: number;
  messages: IMessage[];

  controls = {
    search: new FormControl(''),
  };

  form = new FormGroup(this.controls);

  constructor(
    private chatService: ChatService,
    private notificationService: NotificationService,
    private loadingSpinnerService: LoadingSpinnerService,
    public authService: AuthService
  ) {
    this.getThreads();
  }

  getThreads() {
    this.loadingSpinnerService.setLoaderValue(true);
    this.chatService
      .getThreads()
      .pipe(
        finalize(() => {
          this.loadingSpinnerService.setLoaderValue(false);
        })
      )
      .subscribe(
        (resp) => {
          this.threads = resp.results;
        },
        () => {
          this.notificationService.send.error(loadDataError);
        }
      );
  }

  getMessages(thread) {
    this.loadingSpinnerService.setLoaderValue(true);
    this.chatService
      .loadMessages({ threadId: thread.id })
      .pipe(
        finalize(() => {
          this.loadingSpinnerService.setLoaderValue(false);
        })
      )
      .subscribe(
        (resp) => {
          this.messages = resp.results;
        },
        () => {
          this.notificationService.send.error(loadDataError);
        }
      );
  }
}

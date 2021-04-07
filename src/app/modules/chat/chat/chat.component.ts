import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { loadDataError } from 'src/app/core/consts/messages';
import { IMessage } from 'src/app/core/interfaces/chat.interface';
import { AuthService } from 'src/app/core/services/auth.service';
import { ChatService } from 'src/app/core/services/chat.service';
import { LoadingSpinnerService } from 'src/app/shared/loading-spinner/loading-spinner.service';
import { NotificationService } from 'src/app/shared/notification/notification.service';

/**
 * Chat component
 */
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnDestroy {
  /**
   * Messages
   */
  @Input() messages: IMessage[];

  /**
   * Subscription
   */
  subscription: Subscription = new Subscription();

  /**
   * Thread ID
   */
  id: number;

  /**
   * Form controls
   */
  controls = {
    content: new FormControl(''),
  };

  /**
   * Form
   */
  form = new FormGroup(this.controls);

  /**
   * Chat component constructor
   * @param authService Authorization service
   * @param chatService Chat service
   * @param loadingSpinnerService Loading sinner service
   * @param notificationService Notification service
   * @param activatedRoute Activated route sevice
   */
  constructor(
    public authService: AuthService,
    private chatService: ChatService,
    private loadingSpinnerService: LoadingSpinnerService,
    private notificationService: NotificationService,
    public activatedRoute: ActivatedRoute
  ) {
    const param$ = activatedRoute.params.subscribe((param) => {
      this.id = Number(param.id);
      if (this.id) {
        this.getMessages();
      }
    });
    this.subscription.add(param$);
  }

  /**
   * Submit message send
   */
  submit() {
    this.chatService.sendMessage({
      message: this.controls.content.value,
      senderId: this.authService.myData.id,
    });
    this.controls.content.setValue('');
  }

  /**
   * Get messages by thread ID
   */
  getMessages() {
    this.loadingSpinnerService.setLoaderValue(true);
    this.chatService
      .loadMessages({ threadId: this.id })
      .pipe(
        finalize(() => {
          this.loadingSpinnerService.setLoaderValue(false);
        })
      )
      .subscribe(
        (resp) => {
          this.messages = resp.results;
          this.chatService.openConnection(this.id);
          this.subscription.add(
            this.chatService.chatSocket$.subscribe((res) => {
              this.messages = [...this.messages, res];
            })
          );
        },
        () => {
          this.notificationService.send.error(loadDataError);
        }
      );
  }

  /**
   * On destroy unubscribe all subscriptions
   */
  ngOnDestroy(): void {
    this.chatService.closeSocketConnection();
  }
}

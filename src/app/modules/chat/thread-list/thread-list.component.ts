import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { loadDataError } from 'src/app/core/consts/messages';
import { IMessage, IThread } from 'src/app/core/interfaces/chat.interface';
import { AuthService } from 'src/app/core/services/auth.service';
import { ChatService } from 'src/app/core/services/chat.service';
import { LoadingSpinnerService } from 'src/app/shared/loading-spinner/loading-spinner.service';
import { NotificationService } from 'src/app/shared/notification/notification.service';

/**
 * Chat thread list component
 */
@Component({
  selector: 'app-thread-list',
  templateUrl: './thread-list.component.html',
  styleUrls: ['./thread-list.component.scss'],
})
export class ThreadListComponent implements OnDestroy {
  /**
   * Threads
   */
  threads: IThread[];

  /**
   * Thread messages
   */
  messages: IMessage[];

  /**
   * Subscription
   */
  subscription: Subscription = new Subscription();

  /**
   * Form controls
   */
  controls = {
    search: new FormControl(''),
  };

  /**
   * Form
   */
  form = new FormGroup(this.controls);

  /**
   * Threads list component constructor
   * @param chatService Chat service
   * @param notificationService Notification service
   * @param loadingSpinnerService Loading spinner service
   * @param authService Authorization service
   */
  constructor(
    private chatService: ChatService,
    private notificationService: NotificationService,
    private loadingSpinnerService: LoadingSpinnerService,
    public authService: AuthService
  ) {
    this.getThreads();
  }

  /**
   * Get threads
   */
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
          this.getMessages(this.threads[0].id, false);
        },
        () => {
          this.notificationService.send.error(loadDataError);
        }
      );
  }

  /**
   * Get messages
   * @param threadID Thread ID
   * @param closeConnection check if have to close connection
   */
  getMessages(threadID: number, closeConnection = true) {
    if (closeConnection) {
      this.chatService.closeSocketConnection();
    }
    this.loadingSpinnerService.setLoaderValue(true);
    this.chatService
      .loadMessages({ threadId: threadID })
      .pipe(
        finalize(() => {
          this.loadingSpinnerService.setLoaderValue(false);
        })
      )
      .subscribe(
        (resp) => {
          this.messages = resp.results;
          this.chatService.openConnection(threadID);
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
   * On destroy unsubscribe all subscriptions
   */
  ngOnDestroy(): void {
    this.chatService.closeSocketConnection();
  }
}

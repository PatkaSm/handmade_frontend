import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { NotificationService } from './notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit, OnDestroy {
  public state: any;

  public sub: Subscription = new Subscription();

  public success$: Observable<any>;
  public error$: Observable<any>;

  constructor(private uiErrorMessengerService: NotificationService) {
    this.success$ = this.uiErrorMessengerService.success;
    this.error$ = this.uiErrorMessengerService.error;
  }

  ngOnInit() {
    this.sub.add(
      this.success$.subscribe((msg) => {
        this.state = {
          type: 'success',
          message: msg,
        };
        setTimeout(() => {
          this.onCancel();
        }, 6000);
      })
    );

    this.sub.add(
      this.error$.subscribe((msg) => {
        this.state = {
          type: 'alert',
          message: msg,
        };
        setTimeout(() => {
          this.onCancel();
        }, 6000);
      })
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  public onCancel(): void {
    this.state = null;
    this.uiErrorMessengerService.cancel.next({ cancel: true });
  }
}

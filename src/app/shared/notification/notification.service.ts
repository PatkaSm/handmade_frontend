import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  public success: Subject<any> = new Subject();
  public error: Subject<any> = new Subject();
  public cancel: Subject<any> = new Subject();

  public send = {
    success: (message: string) => {
      this.success.next(message);
    },
    error: (message: string) => {
      this.error.next(message);
    },
  };

  constructor() {}
}

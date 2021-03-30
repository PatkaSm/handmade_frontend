import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class LoadingSpinnerService {
  loaderSubject$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  constructor() {}

  getLoaderValue(): Observable<boolean> {
    return this.loaderSubject$.asObservable();
  }

  setLoaderValue(value: boolean): void {
    this.loaderSubject$.next(value);
  }
}

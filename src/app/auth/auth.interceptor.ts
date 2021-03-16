import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { AuthService } from '../core/services/auth.service';
import { catchError } from 'rxjs/operators';

/**
 * Interceptor for Angular universal
 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  /**
   * @ignore
   */
  constructor(public authService: AuthService) {}

  /**
   * Change relative request URL to absolute
   *
   * @returns Request
   */
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err) => {
        if (err.status === 401) {
          // auto logout if 401 response returned from api
          this.authService.logout();
          // eslint-disable-next-line import/no-deprecated
          location.reload(true);
        }

        const error = err.error.message || err.statusText;
        return throwError(error);
      })
    );
  }
}

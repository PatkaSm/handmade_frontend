import { isPlatformBrowser } from '@angular/common';
import {
  HttpClient,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { filter, switchMap, take, catchError } from 'rxjs/operators';
import { AuthService } from '../core/services/auth.service';
import { UtilsService } from '../core/services/utils.service';

/**
 * Token Interceptor
 */
@Injectable({
  providedIn: 'root',
})
export class TokenInterceptor implements HttpInterceptor {
  /**
   * Is refreshing token
   */
  private isRefreshing = false;

  /**
   * Subject for refresh token
   */
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );

  /**
   * If access token exists return token, if not return false
   *
   * @private
   */
  private get getAccessToken(): string | boolean {
    const token = this.authService.token.getAccessToken();
    return token.length > 0 ? token : false;
  }

  constructor(
    public cookieService: CookieService,
    public http: HttpClient,
    public utils: UtilsService,
    public router: Router,
    public authService: AuthService,
    public dom: DomSanitizer,
    @Inject(PLATFORM_ID) private platformId: string
  ) {}

  /**
   * Intercept request and add header if user cookie is set, or send refresh token
   *
   * @param {HttpRequest<any>} request Request
   * @param {HttpHandler} next Next action
   * @returns {Observable<HttpEvent<any>>}
   */
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (isPlatformBrowser(this.platformId)) {
      request = this.addTokenAndLanguage(
        request,
        this.utils.UUIDv4 +
          (this.getAccessToken ? '.' + this.getAccessToken : '')
      );
    }

    return next.handle(request).pipe(
      catchError((error) => {
        if (
          error instanceof HttpErrorResponse &&
          error.status === 401 &&
          !error.url.includes('login')
        ) {
          if (error.url.includes('refresh')) {
            this.authService.token.removeToken();
            location.reload();
            return throwError(error);
          } else {
            return this.handle401Error(request, next);
          }
        } else {
          return throwError(error);
        }
      })
    );
  }

  /**
   * Add token to request
   *
   * @param {HttpRequest<any>} request HTTP Request
   * @param {string | boolean} token Access Token
   * @returns {HttpRequest<any>} Modified request with Authorization header
   */
  private addTokenAndLanguage(
    request: HttpRequest<any>,
    token: string | boolean
  ): HttpRequest<any> {
    const headers = request.headers
      .set('Authorization', token ? `JWT ${token}` : '')
      .set('Accept-Language', 'pl');

    if (this.cookieService.check('csrftoken')) {
      headers.set('X-CSRFToken', this.cookieService.get('csrftoken'));
    }
    request = request.clone({
      headers,
    });

    return request;
  }

  /**
   * Check if is refreshing and send refresh token
   *
   * @param {HttpRequest<any>} request HTTP Request
   * @param {HttpHandler} next HTTP Handler
   * @returns {Observable<any>}
   */
  private handle401Error(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<any> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.authService.refreshToken().pipe(
        switchMap((token: any) => {
          setTimeout(() => {
            this.isRefreshing = false;
          }, 5000);

          this.refreshTokenSubject.next(token.jwt);
          return next
            .handle(
              this.addTokenAndLanguage(
                request,
                this.utils.UUIDv4 +
                  (this.getAccessToken ? '.' + this.getAccessToken : '')
              )
            )
            .pipe(
              catchError((err) => {
                this.authService.token.removeToken();
                this.router.navigateByUrl('/admin/login');
                return of(err);
              })
            );
        })
      );
    } else {
      return this.refreshTokenSubject.pipe(
        filter((token) => token != null),
        take(1),
        switchMap((jwt) =>
          next.handle(
            this.addTokenAndLanguage(
              request,
              this.utils.UUIDv4 +
                (this.getAccessToken ? '.' + this.getAccessToken : '')
            )
          )
        )
      );
    }
  }
}

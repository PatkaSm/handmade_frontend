import { CookieService } from 'ngx-cookie-service';
import { AuthToken } from './auth-token';
import { HttpClient } from '@angular/common/http';
import { IToken } from '../core/interfaces/token.interface';
import { AppConfigService } from '../core/services/app-config.service';
import { Observable, of } from 'rxjs';
import { UtilsService } from '../core/services/utils.service';
import { map, catchError, retry } from 'rxjs/operators';
import { Router } from '@angular/router';

export class AuthCore {
  /**
   * Authorization tokens
   */
  public token: AuthToken;

  /**
   * Check if user is logged
   */
  get isLogged(): boolean {
    return this.cookieService.check(this.token.getUserCookie);
  }

  constructor(
    protected http: HttpClient,
    public cookieService: CookieService,
    public utilService: UtilsService,
    public router: Router
  ) {
    this.token = new AuthToken(cookieService);
  }

  /**
   * Refresh Token
   *
   * @returns {Observable<any>}
   */
  public refreshToken(): Observable<any> {
    return this.http
      .post<any>(`${AppConfigService.config.api}auth/refresh`, {
        refreshToken: this.token.getRefreshToken(),
        browserId: this.utilService.UUIDv4,
      })
      .pipe(
        map((tokens: IToken) => {
          if (tokens.access) {
            this.token.setAccessToken(tokens.access);
            return this.token.getToken();
          }

          this.token.setToken(tokens);
          window.location.reload();
          return tokens;
        }),
        catchError((err) => {
          this.token.removeToken();
          return of(err);
        }),
        retry(2)
      );
  }

  /**
   * Set login data
   *
   * @param data Data to set
   * @protected
   */
  protected setLoginData(data) {
    this.token.setToken(data);
    delete data.access_token;
    delete data.refresh_token;
    this.setUser(data);
  }

  /**
   * Set user data in cookies
   *
   * @param {any} user User Data
   */
  private setUser(user: any): void {
    this.cookieService.set(
      this.token.getUserCookie,
      JSON.stringify(user),
      this.token.getUserCookieTime,
      '/',
      window.location.hostname,
      location.protocol.includes('https'),
      location.protocol.includes('https') ? 'None' : 'Lax'
    );
  }
}

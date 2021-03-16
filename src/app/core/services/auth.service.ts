import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { AuthCore } from 'src/app/auth/auth-core';
import { AppConfigService } from './app-config.service';
import { UtilsService } from './utils.service';

interface IMyData {
  id: string;
  firstName: string;
  lastName: string;
  userMenuItems: string[];
  userProfile: { id: string; name: string };
  email: string;
  isAdmin: boolean;
}

/**
 * Auth Service
 */
@Injectable({
  providedIn: 'root',
})
export class AuthService extends AuthCore {
  /**
   * My user object
   */
  public myData: IMyData;

  constructor(
    protected http: HttpClient,
    public cookieService: CookieService,
    public utilService: UtilsService,
    public router: Router
  ) {
    super(http, cookieService, utilService, router);
  }

  /**
   * Gets data about me
   */
  getMe() {
    return this.http
      .get(`${AppConfigService.config.api}user/current`)
      .subscribe((data: IMyData) => {
        this.myData = data;
      });
  }

  /**
   * Login with email
   *
   * @param userData Payload
   * @protected
   */
  protected loginWithEmail(userData = {}): Observable<any> {
    return this.http.post(`${AppConfigService.config.api}login`, userData).pipe(
      map((response) => {
        this.setLoginData({ ...response });
        return response;
      })
    );
  }

  /**
   * Register with email
   *
   * @param userData Payload
   * @protected
   */
  protected registerWithEmail(userData = {}): Observable<any> {
    return this.http.post(`${AppConfigService.config.api}register`, userData);
  }

  /**
   * Logout user
   *
   * @param userData Payload
   * @protected
   */
  protected userLogout(): Observable<any> {
    return this.http.get(`${AppConfigService.config.api}logout`);
  }

  /**
   * Logout
   *
   * @param data Payload
   */
  public logout(data = {}) {
    this.userLogout();
    this.token.removeToken();
    this.router.navigateByUrl('home');
  }

  /**
   * Is user admin
   */
  public isAdmin() {
    return this.myData?.isAdmin;
  }
}
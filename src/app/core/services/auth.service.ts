import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { AuthCore } from 'src/app/auth/auth-core';
import {
  ILoginData,
  IRegisterData,
  IUserData,
} from '../interfaces/user.interface';
import { AppConfigService } from './app-config.service';
import { UtilsService } from './utils.service';

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
  public myData: IUserData;

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
      .get<IUserData>(`${AppConfigService.config.api}users/me/`)
      .subscribe((data: IUserData) => {
        this.myData = data;
      });
  }

  /**
   * Login with email
   *
   * @param userData Payload
   */
  loginWithEmail(userData: ILoginData): Observable<any> {
    return this.http
      .post(`${AppConfigService.config.api}login/`, userData)
      .pipe(
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
   */
  registerWithEmail(userData: IRegisterData) {
    return this.http.post<IUserData>(
      `${AppConfigService.config.api}users/`,
      userData
    );
  }

  /**
   * Logout user
   *
   * @param userData Payload
   * @protected
   */
  userLogout(): Observable<any> {
    return this.http.get(`${AppConfigService.config.api}logout/`);
  }

  /**
   * Logout
   *
   * @param data Payload
   */
  logout(data = {}) {
    this.userLogout();
    this.token.removeToken();
    this.router.navigateByUrl('home');
  }

  /**
   * Is user admin
   */
  isAdmin() {
    return this.myData?.admin;
  }
}

import { CookieService } from 'ngx-cookie-service';
import { IToken } from '../core/interfaces/token.interface';

/**
 * Auth Token
 */
export class AuthToken {
  /**
   * Token config
   *
   * @private
   */
  private static config = {
    userCookie: 'user',
    tokenCookie: 'token',
    refreshCookie: 'refresh',
    userCookieTime: 1,
  };

  /**
   * Auth token Constructor
   *
   * @param cookieService Cookie Service
   */
  constructor(public cookieService: CookieService) {}
  /**
   * Returns user cookie time name
   */
  public get getUserCookieTime() {
    return AuthToken.config.userCookieTime;
  }

  /**
   * Returns user cookie name
   */
  public get getUserCookie() {
    return AuthToken.config.userCookie;
  }

  /**
   * Get Refresh Token
   */
  getRefreshToken(): string {
    return this.cookieService.get(AuthToken.config.refreshCookie) || '';
  }

  /**
   * Get access token
   */
  getAccessToken(): string {
    return this.cookieService.get(AuthToken.config.tokenCookie) || '';
  }

  /**
   * Get user
   */
  getUserData() {
    try {
      return (
        JSON.parse(this.cookieService.get(AuthToken.config.userCookie)) || ''
      );
    } catch (e) {
      return {};
    }
  }

  /**
   * Set access token
   *
   * @param token Token to set
   */
  setAccessToken(token: string): void {
    this.cookieService.set(
      AuthToken.config.tokenCookie,
      token,
      AuthToken.config.userCookieTime,
      '/',
      window.location.hostname,
      location.protocol.includes('https'),
      location.protocol.includes('https') ? 'None' : 'Lax'
    );
  }

  /**
   * Set refresh token
   *
   * @param token Token to set
   */
  setRefreshToken(token: string): void {
    this.cookieService.set(
      AuthToken.config.refreshCookie,
      token,
      AuthToken.config.userCookieTime,
      '/',
      window.location.hostname,
      location.protocol.includes('https'),
      location.protocol.includes('https') ? 'None' : 'Lax'
    );
  }

  /**
   * Set user data
   *
   * @param data User data to set
   */
  setUserData(data: any): void {
    this.cookieService.set(
      AuthToken.config.userCookie,
      JSON.stringify(data),
      AuthToken.config.userCookieTime,
      '/',
      window.location.hostname,
      location.protocol.includes('https'),
      location.protocol.includes('https') ? 'None' : 'Lax'
    );
  }

  /**
   * Set access and refresh token
   *
   * @param token Access and Refresh token
   */
  setToken(token: IToken) {
    this.setAccessToken(token.accessToken);
    this.setRefreshToken(token.refreshToken);
    if (token.user) {
      this.setUserData(token.user);
    }
  }

  /**
   * Returns access and refresh token
   */
  getToken(): IToken {
    return {
      accessToken: this.getAccessToken(),
      refreshToken: this.getRefreshToken(),
      user: this.getUserData(),
    };
  }

  /**
   * Remove all tokens in cookies
   */
  removeToken(): void {
    this.cookieService.delete(
      AuthToken.config.tokenCookie,
      '/',
      window.location.hostname
    );
    this.cookieService.delete(
      AuthToken.config.userCookie,
      '/',
      window.location.hostname
    );
    this.cookieService.delete(
      AuthToken.config.refreshCookie,
      '/',
      window.location.hostname
    );
  }
}

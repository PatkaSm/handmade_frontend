import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { Subject } from 'rxjs';

/**
 * Utils service
 */
@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  /**
   * Utils config
   *
   * @private
   */
  private static config = {
    uuidCookie: 'uuid',
  };

  /**
   * Accept cookie name
   *
   * @private
   */
  private static ACCEPT_COOKIE = 'accept_cookies';

  /**
   * Utils service constructor
   *
   * @param cookieService Cookie Service
   * @param document Document
   */
  constructor(
    public cookieService: CookieService,
    @Inject(DOCUMENT) private document: Document,
    public http: HttpClient
  ) {}

  /**
   * Handle form control error
   *
   * @param controls Form controls
   * @param errors Errors
   * @param keyMap Keymap
   */
  static handleControlError(controls, errors, keyMap = {}) {
    Object.keys(controls).forEach((key) => {
      (controls[key] as FormControl).setErrors(null);
    });

    Object.keys(errors).forEach((errorKey) => {
      const item = errors[errorKey];
      if (controls[errorKey]) {
        controls[errorKey].setErrors({
          error: item.join(', '),
        });
      }

      const key = keyMap[errorKey];
      if (controls[key]) {
        controls[key].setErrors({
          error: item.join(', '),
        });
      }
    });

    return controls;
  }

  /**
   * Handle form control values
   *
   * @param controls Form controls
   * @param values values
   */
  static handleControlValues(controls, values) {
    Object.keys(values).forEach((key) => {
      if (controls[key]) {
        (controls[key] as FormControl).setValue(values[key]);
      }
    });
  }

  /**
   * Returns saved in cookie UUID
   */
  get UUIDv4(): string {
    return this.cookieService.get(UtilsService.config.uuidCookie);
  }

  /**
   * Generate UUID
   */
  generateUUIDv4(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  /**
   * Set UUID in cookies
   *
   * @param uuid UUID to set
   */
  setUUIDv4(uuid: string): void {
    if (!this.cookieService.check(UtilsService.config.uuidCookie)) {
      this.cookieService.set(
        UtilsService.config.uuidCookie,
        uuid,
        365 * 20,
        '/',
        window.location.hostname,
        location.protocol.includes('https'),
        location.protocol.includes('https') ? 'None' : 'Lax'
      );
    }
  }

  /**
   * Check if cookies are allowed
   *
   * @returns {boolean}
   */
  checkAcceptCookies(): boolean {
    return this.cookieService.check(UtilsService.ACCEPT_COOKIE);
  }

  /**
   * Set Accept cookies
   */
  setAcceptCookies() {
    this.cookieService.set(
      UtilsService.ACCEPT_COOKIE,
      'true',
      365 * 20,
      '/',
      window.location.hostname,
      location.protocol.includes('https'),
      location.protocol.includes('https') ? 'None' : 'Lax'
    );
  }
}

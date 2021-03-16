import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * Login guard
 */
@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  /**
   *
   * @param {AuthService} authService Authorizations serive
   * @param {Router} router Angular router
   */
  constructor(private authService: AuthService, private router: Router) {}

  /**
   * Check if the user is logged, if not go to login view
   */
  canActivate(): boolean | UrlTree {
    if (this.authService.isLogged) {
      return true;
    }
    return this.router.parseUrl('auth/login');
  }
}

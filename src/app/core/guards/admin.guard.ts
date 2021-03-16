import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AdminAuthGuard implements CanActivate {
  constructor(public authService: AuthService) {}

  canActivate() {
    // dopisać warunek na is admin
    return true;
  }
}

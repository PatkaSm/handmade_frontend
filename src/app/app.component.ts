import { Component } from '@angular/core';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'handmade';

  constructor(public authService: AuthService) {
    if (authService.isLogged) {
      authService.getMe();
    }
  }
}

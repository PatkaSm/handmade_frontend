import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { AuthService } from './core/services/auth.service';
import { LoadingSpinnerService } from './shared/loading-spinner/loading-spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  title = 'handmade';
  loadingData = false;
  subscription$: Subscription = new Subscription();

  constructor(
    public authService: AuthService,
    private loadingSpinnerService: LoadingSpinnerService
  ) {
    if (authService.isLogged) {
      authService.getMe();
    }
    this.subscription$.add(
      this.loadingSpinnerService
        .getLoaderValue()
        .subscribe((value) => (this.loadingData = value))
    );
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }
}

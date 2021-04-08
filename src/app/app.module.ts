import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainLayoutComponent } from './modules/layout/main-layout/main-layout.component';
import { SharedModule } from './shared/shared.module';
import { LoginGuard } from './core/guards/login.guard';
import { AppConfigService } from './core/services/app-config.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './auth/token.interceptor';
import { AdminAuthGuard } from './core/guards/admin.guard';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommentComponent } from './modules/comment/comment/comment.component';
import { CommentsComponent } from './modules/comment/comments/comments.component';
import { HomeComponent } from './modules/home/home.component';
import { AddEditOfferComponent } from './modules/offer/add-edit-offer/add-edit-offer.component';
import { OfferDetailsComponent } from './modules/offer/offer-details/offer-details.component';
import { OfferComponent } from './modules/offer/offer/offer.component';
import { OffersComponent } from './modules/offer/offers/offers.component';
import { ProfileComponent } from './modules/profile/profile.component';
import { RegisterComponent } from './modules/register/register.component';
import { MatMenuModule } from '@angular/material/menu';
import { CategoriesComponent } from './modules/layout/categories/categories.component';
import { FooterComponent } from './modules/layout/footer/footer.component';
import { HeaderComponent } from './modules/layout/header/header.component';
import { NavComponent } from './modules/layout/nav/nav.component';
import { LoginComponent } from './modules/login/login.component';
import { MatTreeModule } from '@angular/material/tree';
import { CdkTreeModule } from '@angular/cdk/tree';
/**
 * Load configuration on initialize application
 * @param appConfigService Application config service
 */
export function initializeApp(appConfigService: AppConfigService) {
  return () => appConfigService.load();
}

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    RegisterComponent,
    ProfileComponent,
    HomeComponent,
    AddEditOfferComponent,
    OfferDetailsComponent,
    OfferComponent,
    OffersComponent,
    CommentComponent,
    CommentsComponent,
    HeaderComponent,
    NavComponent,
    FooterComponent,
    CategoriesComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatTreeModule,
    CdkTreeModule,
  ],
  providers: [
    AdminAuthGuard,
    LoginGuard,
    AppConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [AppConfigService],
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

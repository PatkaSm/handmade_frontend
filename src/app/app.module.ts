import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainLayoutComponent } from './modules/layout/main-layout/main-layout.component';
import { HeaderComponent } from './modules/layout/header/header.component';
import { NavComponent } from './modules/layout/nav/nav.component';
import { CategoriesComponent } from './modules/layout/categories/categories.component';

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    HeaderComponent,
    NavComponent,
    CategoriesComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

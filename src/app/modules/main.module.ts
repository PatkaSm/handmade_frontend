import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { MainRoutingModule } from './main-routing.module';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    HomeComponent,
  ],
  imports: [CommonModule, MainRoutingModule],
})
export class MainModule {}

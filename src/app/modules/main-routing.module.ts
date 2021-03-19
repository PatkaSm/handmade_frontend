import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';

/**
 * Home routes
 */
const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'forum',
    loadChildren: () =>
      import('../modules/forum/forum.module').then((m) => m.ForumModule),
  },
  {
    path: 'administration',
    loadChildren: () =>
      import('../modules/admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: '',
    component: HomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}

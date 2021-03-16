import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
    loadChildren: () =>
      import('../modules/profile/profile.module').then((m) => m.ProfileModule),
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
    path: 'offers',
    loadChildren: () =>
      import('../modules/offer/offer.module').then((m) => m.OfferModule),
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AddEditOfferComponent } from './offer/add-edit-offer/add-edit-offer.component';
import { OffersComponent } from './offer/offers/offers.component';
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
    path: 'profile/:id',
    component: ProfileComponent,
  },
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'offers/:name',
    component: OffersComponent,
  },
  {
    path: 'offers/user/:id',
    component: OffersComponent,
  },
  {
    path: 'offer/add',
    component: AddEditOfferComponent,
  },
  {
    path: 'offer/:id/edit',
    component: AddEditOfferComponent,
  },
  {
    path: 'favourites',
    component: OffersComponent,
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}

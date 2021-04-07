import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminAuthGuard } from './core/guards/admin.guard';
import { LoginGuard } from './core/guards/login.guard';
import { HomeComponent } from './modules/home/home.component';
import { AddEditOfferComponent } from './modules/offer/add-edit-offer/add-edit-offer.component';
import { OfferDetailsComponent } from './modules/offer/offer-details/offer-details.component';
import { OffersComponent } from './modules/offer/offers/offers.component';
import { ProfileComponent } from './modules/profile/profile.component';
import { RegisterComponent } from './modules/register/register.component';

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
    path: 'offers/:name/search/:search',
    component: OffersComponent,
  },
  {
    path: 'offers/user/:id',
    component: OffersComponent,
  },
  {
    path: 'offer/add',
    component: AddEditOfferComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'offer/:id',
    component: OfferDetailsComponent,
  },
  {
    path: 'offer/:id/edit',
    component: AddEditOfferComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'favourites',
    component: OffersComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'forum',
    loadChildren: () =>
      import('../app/modules/forum/forum.module').then((m) => m.ForumModule),
    canActivate: [LoginGuard],
  },
  {
    path: 'administration',
    loadChildren: () =>
      import('../app/modules/admin/admin.module').then((m) => m.AdminModule),
    canActivate: [LoginGuard, AdminAuthGuard],
  },
  {
    path: 'chat',
    loadChildren: () =>
      import('../app/modules/chat/chat.module').then((m) => m.ChatModule),
    canActivate: [LoginGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

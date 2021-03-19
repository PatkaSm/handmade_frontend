import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { MainRoutingModule } from './main-routing.module';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { AddEditOfferComponent } from './offer/add-edit-offer/add-edit-offer.component';
import { FavouritesComponent } from './offer/favourites/favourites.component';
import { OfferDetailsComponent } from './offer/offer-details/offer-details.component';
import { OfferComponent } from './offer/offer/offer.component';

@NgModule({
  declarations: [
    RegisterComponent,
    ProfileComponent,
    HomeComponent,
    AddEditOfferComponent,
    FavouritesComponent,
    OfferDetailsComponent,
    OfferComponent,
  ],
  imports: [CommonModule, MainRoutingModule, SharedModule],
})
export class MainModule {}

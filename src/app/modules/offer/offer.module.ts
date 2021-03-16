import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEditOfferComponent } from './add-edit-offer/add-edit-offer.component';
import { OfferDetailsComponent } from './offer-details/offer-details.component';
import { FavouritesComponent } from './favourites/favourites.component';



@NgModule({
  declarations: [AddEditOfferComponent, OfferDetailsComponent, FavouritesComponent],
  imports: [
    CommonModule
  ]
})
export class OfferModule { }

import { Component, Input } from '@angular/core';
import { IOffer } from 'src/app/core/interfaces/offer.interfaces';

/**
 * Offer component
 */
@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.scss'],
})
export class OfferComponent {
  /**
   * Offer data
   */
  @Input() offer: IOffer;

  constructor() {}
}

import { Component, Input, OnInit } from '@angular/core';
import { IOffer } from 'src/app/core/interfaces/offer.interfaces';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.scss'],
})
export class OfferComponent implements OnInit {
  @Input() offer: IOffer;
  constructor() {}

  ngOnInit(): void {}
}

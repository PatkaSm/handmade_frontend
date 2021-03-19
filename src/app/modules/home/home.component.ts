import { Component, OnInit } from '@angular/core';
import { loadErrorMessage } from 'src/app/core/consts/messages';
import { OfferService } from 'src/app/core/services/offer.service';
import { NotificationService } from 'src/app/shared/notification/notification.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  offers = [];
  constructor(
    public offerService: OfferService,
    public notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.getOffers();
  }

  getOffers() {
    this.offerService.getOffers().subscribe(
      (resp) => {
        this.offers = resp.results;
        console.log(resp.results);
      },
      (error) => {
        this.notificationService.send.error(loadErrorMessage('ofert'));
      }
    );
  }
}

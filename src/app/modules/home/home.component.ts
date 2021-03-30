import { Component, OnInit } from '@angular/core';
import { loadErrorMessage } from 'src/app/core/consts/messages';
import { OfferService } from 'src/app/core/services/offer.service';
import { ModalService } from 'src/app/shared/modal/modal.service';
import { NotificationService } from 'src/app/shared/notification/notification.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  offers = [];
  modalID = (this.modalService.generatedId + 1).toString();

  constructor(
    public offerService: OfferService,
    public notificationService: NotificationService,
    public modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.getOffers();
  }

  getOffers() {
    this.offerService.getOffers().subscribe(
      (resp) => {
        this.offers = resp.results.slice(0, 5);
      },
      (error) => {
        this.notificationService.send.error(loadErrorMessage('ofert'));
      }
    );
  }
}

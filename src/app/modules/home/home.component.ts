import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { loadErrorMessage } from 'src/app/core/consts/messages';
import { Category } from 'src/app/core/enums/category';
import { IOffer } from 'src/app/core/interfaces/offer.interfaces';
import { OfferService } from 'src/app/core/services/offer.service';
import { LoadingSpinnerService } from 'src/app/shared/loading-spinner/loading-spinner.service';
import { ModalService } from 'src/app/shared/modal/modal.service';
import { NotificationService } from 'src/app/shared/notification/notification.service';

/**
 * Home component
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  /**
   * Last offers
   */
  offers: IOffer[] = [];

  /**
   * Login Modal ID
   */
  modalID = (this.modalService.generatedId + 1).toString();

  /**
   * Home component constructor
   * @param offerService Offer service
   * @param notificationService Notification Service
   * @param modalService Modal service
   * @param loadingSpinnerService Loading spinner service
   */
  constructor(
    public offerService: OfferService,
    public notificationService: NotificationService,
    public modalService: ModalService,
    private loadingSpinnerService: LoadingSpinnerService
  ) {}

  /**
   * On init get last offers
   */
  ngOnInit(): void {
    this.getOffers();
  }

  /**
   * Get offers
   */
  getOffers() {
    this.loadingSpinnerService.setLoaderValue(true);
    this.offerService
      .getOffers({ category: Category.All })
      .pipe(
        finalize(() => {
          this.loadingSpinnerService.setLoaderValue(false);
        })
      )
      .subscribe(
        (resp) => {
          this.offers = resp.results.slice(0, 5);
        },
        (error) => {
          this.notificationService.send.error(loadErrorMessage('ofert'));
        }
      );
  }
}

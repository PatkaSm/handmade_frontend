import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, throwError } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { loadDataError } from 'src/app/core/consts/messages';
import {
  IOffer,
  IOfferPaginatedResponse,
} from 'src/app/core/interfaces/offer.interfaces';
import { OfferService } from 'src/app/core/services/offer.service';
import { LoadingSpinnerService } from 'src/app/shared/loading-spinner/loading-spinner.service';
import { NotificationService } from 'src/app/shared/notification/notification.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss'],
})
export class OffersComponent implements OnDestroy {
  /**
   * Offers
   */
  offers: IOffer[] = [];

  /**
   * Pagination
   */
  pagination = {
    page: 1,
    limit: 15,
  };

  /**
   * Pagination limit
   */
  loadSize = 15;

  /**
   * Pagination offset
   */
  offset = 0;

  /**
   * Pagination total items
   */
  totalItems = 0;

  /**
   * Filters
   */
  filters = { ordering: '-price' };

  /**
   * Sbscription
   */
  subscription: Subscription = new Subscription();

  /**
   * Category name
   */
  categoryName: string;

  /**
   * User ID
   */
  userID: number;

  /**
   * Offers component constructor
   * @param offerService Offer service
   * @param route Angular route
   * @param notificationService Notification service
   * @param loadingSpinnerService Loading spinner service
   */
  constructor(
    private offerService: OfferService,
    private route: ActivatedRoute,
    public notificationService: NotificationService,
    private loadingSpinnerService: LoadingSpinnerService
  ) {
    const param$ = route.params.subscribe((param) => {
      this.categoryName = param.name;
      this.userID = param.id;
      this.getOffers();
    });
    this.subscription.add(param$);
  }

  /**
   *
   * @param $event Pagination select output event
   */
  onPaginationOutput($event: any) {
    this.loadSize = $event.limit;
    this.pagination.page = $event.page;
    this.pagination.limit = $event.limit;
    this.getOffers();
  }

  /**
   * Get offers (by category, by user ID or users favourite offers)
   */
  getOffers() {
    this.loadingSpinnerService.setLoaderValue(true);
    let request;
    if (this.userID) {
      request = this.offerService.getUserOffers(this.userID, this.filters);
    } else if (this.categoryName) {
      request = this.offerService.getOffersByCategory({
        category: this.categoryName,
        ...this.filters,
      });
    } else {
      request = this.offerService.getFavourites(this.filters);
    }
    request
      .pipe(
        finalize(() => {
          this.loadingSpinnerService.setLoaderValue(false);
        })
      )
      .subscribe(
        (resp) => {
          this.offers =
            this.userID || this.categoryName
              ? resp.results
              : resp.results.map((element) => element.offer);
          this.totalItems = resp.count;
        },
        () => {
          this.notificationService.send.error(loadDataError);
        }
      );
  }

  /**
   * Pagination method
   * @param page Page number
   */
  getData(page = this.pagination.page) {
    this.offset = (page - 1) * this.pagination.limit;
    this.getOffers();
  }

  getActiveFilters($event) {
    this.filters = $event;
    this.getOffers();
  }

  /**
   * On destron unsubscribe subsctiprion
   */
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

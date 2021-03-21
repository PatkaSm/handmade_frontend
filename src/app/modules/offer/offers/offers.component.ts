import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, throwError } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { loadDataError } from 'src/app/core/consts/messages';
import { IOffer } from 'src/app/core/interfaces/offer.interfaces';
import { OfferService } from 'src/app/core/services/offer.service';
import { LoadingSpinnerService } from 'src/app/shared/loading-spinner/loading-spinner.service';
import { NotificationService } from 'src/app/shared/notification/notification.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss'],
})
export class OffersComponent implements OnInit, OnDestroy {
  offers: IOffer[] = [];
  pagination = {
    page: 1,
    limit: 15,
  };
  loadSize = 15;
  offset = 0;
  totalItems = 0;

  subscription: Subscription = new Subscription();
  categoryName: string;

  constructor(
    private offerService: OfferService,
    private route: ActivatedRoute,
    public notificationService: NotificationService,
    private loadingSpinnerService: LoadingSpinnerService
  ) {
    const param$ = route.params.subscribe((param) => {
      this.categoryName = param.name;
      this.getOffers();
    });
    this.subscription.add(param$);
  }

  ngOnInit(): void {}

  onPaginationOutput($event: any) {
    this.loadSize = $event.limit;
    this.pagination.page = $event.page;
    this.pagination.limit = $event.limit;
    this.getOffers();
  }

  getOffers() {
    this.loadingSpinnerService.setLoaderValue(true);
    this.offerService
      .getOffers({ offset: this.offset, limit: this.loadSize })
      .pipe(
        finalize(() => {
          this.loadingSpinnerService.setLoaderValue(false);
        })
      )
      .subscribe(
        (resp) => {
          this.offers = resp.results;
          this.totalItems = resp.count;
        },
        (error) => {
          this.notificationService.send.error(loadDataError);
        }
      );
  }

  getData(page = this.pagination.page) {
    this.offset = (page - 1) * this.pagination.limit;
    this.getOffers();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

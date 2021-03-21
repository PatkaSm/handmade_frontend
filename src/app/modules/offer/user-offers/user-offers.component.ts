import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { loadDataError } from 'src/app/core/consts/messages';
import { IOffer } from 'src/app/core/interfaces/offer.interfaces';
import { OfferService } from 'src/app/core/services/offer.service';
import { LoadingSpinnerService } from 'src/app/shared/loading-spinner/loading-spinner.service';
import { NotificationService } from 'src/app/shared/notification/notification.service';

@Component({
  selector: 'app-user-offers',
  templateUrl: './user-offers.component.html',
  styleUrls: ['./user-offers.component.scss'],
})
export class UserOffersComponent implements OnDestroy {
  offers: IOffer[] = [];
  pagination = {
    page: 1,
    limit: 15,
  };
  loadSize = 15;
  offset = 0;
  totalItems = 0;
  showTitle = false;

  subscription: Subscription = new Subscription();
  userID: number;
  constructor(
    private offerService: OfferService,
    private activatedRoute: ActivatedRoute,
    public notificationService: NotificationService,
    private loadingSpinnerService: LoadingSpinnerService
  ) {
    const param$ = activatedRoute.params.subscribe((param) => {
      this.userID = param.id;
      this.getOffers();
    });
    this.subscription.add(param$);
  }

  onPaginationOutput($event: any) {
    this.loadSize = $event.limit;
    this.pagination.page = $event.page;
    this.pagination.limit = $event.limit;
    this.getOffers();
  }

  getOffers() {
    this.loadingSpinnerService.setLoaderValue(true);
    this.offerService
      .getUserOffers(this.userID, { offset: this.offset, limit: this.loadSize })
      .pipe(
        finalize(() => {
          this.loadingSpinnerService.setLoaderValue(false);
          this.showTitle = true;
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

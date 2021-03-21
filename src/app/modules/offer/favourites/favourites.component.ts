import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { loadDataError } from 'src/app/core/consts/messages';
import { OfferService } from 'src/app/core/services/offer.service';
import { LoadingSpinnerService } from 'src/app/shared/loading-spinner/loading-spinner.service';
import { NotificationService } from 'src/app/shared/notification/notification.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss'],
})
export class FavouritesComponent implements OnInit {
  offers = [];
  pagination = {
    page: 1,
    limit: 15,
  };
  loadSize = 15;
  offset = 0;
  totalItems = 0;
  showTitle = false;

  constructor(
    private offerService: OfferService,
    public notificationService: NotificationService,
    private loadingSpinnerService: LoadingSpinnerService
  ) {}

  ngOnInit(): void {
    this.getOffers();
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
      .getFavourites({ offset: this.offset, limit: this.loadSize })
      .pipe(
        finalize(() => {
          this.loadingSpinnerService.setLoaderValue(false);
          this.showTitle = true;
        })
      )
      .subscribe(
        (resp) => {
          this.offers = resp.results.map((element) => element.offer);
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
}

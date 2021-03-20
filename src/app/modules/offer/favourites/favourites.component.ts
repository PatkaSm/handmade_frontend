import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { loadDataError } from 'src/app/core/consts/messages';
import { OfferService } from 'src/app/core/services/offer.service';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { paginator } from 'src/app/shared/pagination/pagination.component';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss'],
})
export class FavouritesComponent implements OnInit {
  offers = [];
  limit = 20;
  offset = 20;
  paginator = { ...paginator };
  pagination = { limit: this.limit, pageNumber: 1 };

  constructor(
    private offerService: OfferService,
    public notificationService: NotificationService
  ) {}

  ngOnInit(): void {}
  onPaginationOutput($event: any) {
    this.getOffers($event.ResultsOnPageLimit, $event.PageNumber);
  }

  getOffers(limit: number, pageNumber: number) {
    this.paginator.currentPageNumber = pageNumber;
    this.offset = (pageNumber - 1) * limit;
    this.offerService.getFavourites(this.getFilters()).subscribe(
      (resp) => {
        this.pagination.limit = limit;
        this.pagination.pageNumber = pageNumber;
        this.paginator = {
          currentPageNumber: Number(pageNumber),
          totalPagesCount: Math.ceil(resp.count / limit),
          count: resp.count,
          results: [...resp.results],
        };
      },
      (error) => {
        this.notificationService.send.error(loadDataError);
      }
    );
  }

  private getFilters() {
    return {
      limit: this.limit,
      offset: this.offset,
    };
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, throwError } from 'rxjs';
import { loadDataError } from 'src/app/core/consts/messages';
import { OfferService } from 'src/app/core/services/offer.service';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { paginator } from 'src/app/shared/pagination/pagination.component';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss'],
})
export class OffersComponent implements OnInit, OnDestroy {
  offers = [];
  limit = 20;
  offset = 20;
  paginator = { ...paginator };
  pagination = { limit: this.limit, pageNumber: 1 };
  subscription: Subscription = new Subscription();
  categoryName: string;

  constructor(
    private offerService: OfferService,
    private route: ActivatedRoute,
    public notificationService: NotificationService
  ) {
    const param$ = route.params.subscribe((param) => {
      this.categoryName = param.name;
      this.getOffers(this.limit, this.offset);
    });
    this.subscription.add(param$);
  }

  ngOnInit(): void {}

  onPaginationOutput($event: any) {
    this.getOffers($event.ResultsOnPageLimit, $event.PageNumber);
  }

  getOffers(limit: number, pageNumber: number) {
    this.paginator.currentPageNumber = pageNumber;
    this.offset = (pageNumber - 1) * limit;
    this.offerService.getOffers(this.getFilters()).subscribe(
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
      category: this.categoryName,
      limit: this.limit,
      offset: this.offset,
    };
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { loadDataError } from 'src/app/core/consts/messages';
import { OfferService } from 'src/app/core/services/offer.service';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { paginator } from 'src/app/shared/pagination/pagination.component';

@Component({
  selector: 'app-user-offers',
  templateUrl: './user-offers.component.html',
  styleUrls: ['./user-offers.component.scss'],
})
export class UserOffersComponent implements OnInit {
  offers = [];
  limit = 20;
  offset = 20;
  paginator = { ...paginator };
  pagination = { limit: this.limit, pageNumber: 1 };
  subscription: Subscription = new Subscription();
  userID: number;
  constructor(
    private offerService: OfferService,
    private activatedRoute: ActivatedRoute,
    public notificationService: NotificationService
  ) {
    const param$ = activatedRoute.params.subscribe((param) => {
      this.userID = param.id;
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
    this.offerService.getUserOffers(this.userID, this.getFilters()).subscribe(
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

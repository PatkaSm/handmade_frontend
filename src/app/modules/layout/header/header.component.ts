import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { OfferService } from 'src/app/core/services/offer.service';

/**
 * Header component
 */
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnDestroy {
  /**
   * Form controls
   */
  controls = {
    search: new FormControl(),
  };

  /**
   * Form
   */
  form = new FormGroup(this.controls);

  /**
   * Subscription
   */
  subscription: Subscription = new Subscription();

  /**
   * Category name
   */
  categoryName: string;

  /**
   *
   * @param route Angular Active route
   * @param offerService Offer Service
   * @param router Angular Rouer
   */
  constructor(
    public route: ActivatedRoute,
    private offerService: OfferService,
    public router: Router
  ) {
    const param$ = route.params.subscribe((param) => {
      this.categoryName = param.name;
      // this.searchOffers();
    });
    this.subscription.add(param$);
  }

  /**
   * On destroy unsubscribe all subscription
   */
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

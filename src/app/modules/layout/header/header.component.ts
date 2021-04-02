import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { OfferService } from 'src/app/core/services/offer.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  controls = {
    search: new FormControl(),
  };

  form = new FormGroup(this.controls);
  subscription: Subscription = new Subscription();
  /**
   * Category name
   */
  categoryName: string;

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
}

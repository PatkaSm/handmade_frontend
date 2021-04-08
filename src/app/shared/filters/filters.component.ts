import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { loadFiltersError } from 'src/app/core/consts/messages';
import { OfferService } from 'src/app/core/services/offer.service';
import { NotificationService } from '../notification/notification.service';

/**
 * Filters component
 */
@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent implements OnInit {
  /**
   * Colors
   */
  colors: string[];

  /**
   * Days
   */
  days: string[];

  /**
   * Gender type
   */
  genderType: string[];

  /**
   * Order by values
   */
  orderBy = [
    {
      id: 'price',
      value: 'Od najtańszych',
    },
    {
      id: '-price',
      value: 'Od najdroższych',
    },
    {
      id: '-date',
      value: 'Od najnowszego',
    },
    {
      id: 'date',
      value: 'Od najstarszego',
    },
  ];

  /**
   * Send selected filters
   */
  @Output() selectedFilters: EventEmitter<any> = new EventEmitter();

  /**
   * Send selected filters
   */
  @Output() closeFilters: EventEmitter<void> = new EventEmitter();

  /**
   * Form controls
   */
  controls = {
    gender: new FormControl(''),
    item__color: new FormControl(''),
    price__gte: new FormControl(''),
    price__lte: new FormControl(''),
    item__ready_in: new FormControl(''),
    shipping_abroad: new FormControl(''),
    ordering: new FormControl('-date'),
  };

  /**
   * Form
   */
  form = new FormGroup({ ...this.controls });

  /**
   * Filters component constructor
   * @param offerService Offer service
   * @param notificationService Notification service
   */
  constructor(
    private offerService: OfferService,
    private notificationService: NotificationService
  ) {}

  /**
   * On init get properties and send filters
   */
  ngOnInit(): void {
    this.getProperties();
    this.selectedFilters.emit(this.getFlters());
  }

  /**
   * Send filters
   */
  sendFilters() {
    this.selectedFilters.emit(this.getFlters());
    this.closeFilters.emit();
  }

  /**
   * Get colors, gender type and days
   */
  getProperties() {
    this.offerService.getItemProperties().subscribe(
      (resp) => {
        this.colors = [
          { id: '', value: 'Wszystkie' },
          ...resp.colors.map((element) => ({
            id: element[0],
            value: element[1],
          })),
        ];
        this.days = [
          { id: '', value: 'Wszystkie' },
          ...resp.ready_in.map((element) => ({
            id: element[0],
            value: element[1],
          })),
        ];
        this.genderType = [
          { id: '', value: 'Wszystkie' },
          ...resp.gender.map((element) => ({
            id: element[0],
            value: element[1],
          })),
        ];
      },
      () => {
        this.notificationService.send.error(loadFiltersError);
      }
    );
  }

  /**
   * Get selected filters controls values
   * @returns selected filters values
   */
  getFlters() {
    let filters: any = {
      ordering: this.controls.ordering.value,
    };
    if (this.controls.gender.value) {
      filters = { ...filters, gender: this.controls.gender.value };
    }
    if (this.controls.item__color.value) {
      filters = { ...filters, item__color: this.controls.item__color.value };
    }
    if (this.controls.item__ready_in.value) {
      filters = {
        ...filters,
        item__ready_in: this.controls.item__ready_in.value,
      };
    }
    if (this.controls.price__gte.value) {
      filters = { ...filters, price__gte: this.controls.price__gte.value };
    }
    if (this.controls.price__lte.value) {
      filters = { ...filters, price__lte: this.controls.price__lte.value };
    }
    return filters;
  }
}

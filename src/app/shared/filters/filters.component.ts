import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { loadDataError, loadFiltersError } from 'src/app/core/consts/messages';
import { OfferService } from 'src/app/core/services/offer.service';
import { NotificationService } from '../notification/notification.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent implements OnInit {
  colors: string[];
  days: string[];
  genderType: string[];
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

  @Output() selectedFilters: EventEmitter<any> = new EventEmitter();

  controls = {
    gender: new FormControl(''),
    item__color: new FormControl(''),
    price__gte: new FormControl(''),
    price__lte: new FormControl(''),
    item__ready_in: new FormControl(''),
    shipping_abroad: new FormControl(''),
    ordering: new FormControl('-date'),
  };

  form = new FormGroup({ ...this.controls });

  constructor(
    private offerService: OfferService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.getProperties();
    this.selectedFilters.emit(this.getFlters());
  }

  sendFilters() {
    this.selectedFilters.emit(this.getFlters());
  }

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

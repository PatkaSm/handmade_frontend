import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {
  errorMessage,
  loadDataError,
  succesMessage,
  succesSave,
} from 'src/app/core/consts/messages';
import { ICategory } from 'src/app/core/interfaces/category.interface';
import { IOffer } from 'src/app/core/interfaces/offer.interfaces';
import { CategoryService } from 'src/app/core/services/category.service';
import { OfferService } from 'src/app/core/services/offer.service';
import { IImage } from 'src/app/shared/gallery/gallery.component';
import { NotificationService } from 'src/app/shared/notification/notification.service';

@Component({
  selector: 'app-add-edit-offer',
  templateUrl: './add-edit-offer.component.html',
  styleUrls: ['./add-edit-offer.component.scss'],
})
export class AddEditOfferComponent implements OnInit {
  urls = new Array<string>();
  images: IImage[] = [];
  tags = [];
  categories = [];
  colors: string[];
  days: string[];
  genderType = [];
  offer: IOffer;
  id: number;

  controls = {
    name: new FormControl(''),
    description: new FormControl(''),
    tag: new FormControl(''),
    category: new FormControl(''),
    price: new FormControl(''),
    color: new FormControl(''),
    ready_in: new FormControl(''),
    gender: new FormControl(''),
    abroad: new FormControl(''),
  };

  form: FormGroup = new FormGroup({ ...this.controls });

  subscription$: Subscription = new Subscription();
  constructor(
    private categoryService: CategoryService,
    private offerService: OfferService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.getCategories();
    this.getProperties();
  }

  getspliteTags() {
    let spliteTags: { word: string }[] = [];
    if (Array.isArray(this.controls.tag.value)) {
      spliteTags = this.controls.tag.value;
    } else {
      spliteTags = this.controls.tag.value.split(',');
      return spliteTags.map((element) => ({ word: element }));
    }
  }

  getData() {
    return {
      description: this.controls.description.value,
      tag: this.getspliteTags(),
      item: {
        name: this.controls.name.value,
        category: this.controls.category.value,
        color: this.controls.color.value,
        ready_in: this.controls.ready_in.value,
      },
      price: this.controls.price.value,
      gender: this.controls.gender.value,
      shipping_abroad: this.controls.abroad.value,
      gallery: this.images.map((element) => element.id),
    };
  }

  getCategories() {
    this.categoryService.getAllCategories().subscribe(
      (response) => {
        this.categories = response.map((element) => ({
          id: element.id,
          value: element.name,
        }));
        console.log(this.categories);
      },
      () => {
        this.notificationService.send.error(loadDataError);
      }
    );
  }

  getProperties() {
    this.offerService.getItemProperties().subscribe(
      (resp) => {
        this.colors = resp.colors.map((element) => ({
          id: element[0],
          value: element[1],
        }));
        this.days = resp.ready_in.map((element) => ({
          id: element[0],
          value: element[1],
        }));
        this.genderType = resp.gender.map((element) => ({
          id: element[0],
          value: element[1],
        }));
      },
      () => {
        this.notificationService.send.error(loadDataError);
      }
    );
  }

  addOffer() {
    const request = this.id
      ? this.offerService.updateOfferDetails(this.id, this.getData())
      : this.offerService.addOffer(this.getData());
    request.subscribe(
      (response) => {
        this.notificationService.send.success(
          this.id ? succesMessage : succesSave('ofertę')
        );
        this.router.navigateByUrl(`offers/user/${response.owner}`);
      },
      () => {
        this.notificationService.send.error(errorMessage);
      }
    );
  }

  getOfferDetails() {
    this.offerService.getOfferDetails(this.id).subscribe(
      (resp) => {
        this.assignToControls(resp);
      },
      (error) => {
        this.notificationService.send.error(loadDataError);
      }
    );
  }

  assignToControls(offer) {
    this.controls.name.setValue(offer.item.name);
    this.controls.description.setValue(offer.description);
    this.controls.tag.setValue(offer.tag.map((element) => element.word));
    this.images = offer.gallery;
    this.controls.category.setValue(offer.item.category);
    this.controls.gender.setValue(offer.gender);
    this.controls.price.setValue(offer.price);
    this.controls.color.setValue(offer.item.color);
    this.controls.ready_in.setValue(offer.item.ready_in);
    this.controls.abroad.setValue(offer.shipping_abroad);
  }

  getImages(event) {
    this.images = event;
  }
}

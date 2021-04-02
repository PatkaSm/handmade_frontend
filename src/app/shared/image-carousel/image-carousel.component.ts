import { Component, Input, OnInit } from '@angular/core';
import { element } from 'protractor';
import { IImage } from 'src/app/core/interfaces/offer.interfaces';

@Component({
  selector: 'app-image-carousel',
  templateUrl: './image-carousel.component.html',
  styleUrls: ['./image-carousel.component.scss'],
})
export class ImageCarouselComponent implements OnInit {
  @Input() images: IImage[] = [];
  mainImage: IImage;
  imageNumber = 0;

  constructor() {}

  ngOnInit(): void {
    this.mainImage = this.images[0];
  }

  prevImage() {
    if (this.imageNumber >= 0) {
      this.imageNumber--;
      this.mainImage = this.images[this.imageNumber];
    }
    if (this.imageNumber === -1) {
      this.imageNumber = this.images.length - 1;
      this.mainImage = this.images[this.imageNumber];
    }
  }

  nextImage() {
    if (this.imageNumber <= this.images.length - 1) {
      this.imageNumber++;
      this.mainImage = this.images[this.imageNumber];
    }
    if (this.imageNumber === this.images.length) {
      this.imageNumber = 0;
      this.mainImage = this.images[this.imageNumber];
    }
  }

  setAsMain(image, index) {
    this.mainImage = image;
    this.imageNumber = index;
  }
}

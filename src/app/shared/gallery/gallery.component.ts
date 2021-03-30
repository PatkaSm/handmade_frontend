import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { error, errorMessage } from 'src/app/core/consts/messages';
import { OfferService } from 'src/app/core/services/offer.service';
import { NotificationService } from '../notification/notification.service';

export interface IImage {
  id?: number;
  img?: string;
  loader?: boolean;
}
@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent implements OnInit {
  @Input() images: IImage[];
  @Output() sendValue: EventEmitter<any> = new EventEmitter();
  loadedFiles: File[] = [];
  @ViewChild('imageInput', { static: false }) imageInput: ElementRef;
  @Input() title = 'Zdjęcia obiektu';
  constructor(
    private resourceService: OfferService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {}

  deleteImage(image: IImage, imageIndex: number): void {
    this.images = this.images.filter((_, index) => index !== imageIndex);
    this.loadedFiles = this.loadedFiles.filter(
      (_, index) => index !== imageIndex
    );

    this.sendValue.emit(this.images);
    this.imageInput.nativeElement.value = null;
  }

  getImages($event: any): void {
    const startingPoint: number = this.images.length;
    this.loadedFiles = [...this.loadedFiles, ...$event.target.files];
    if ($event.target.files) {
      for (let i = startingPoint; i < this.loadedFiles.length; i++) {
        this.images[i] = { id: null, img: '', loader: true };
        const fd = new FormData();
        fd.append('img', this.loadedFiles[i], this.loadedFiles[i].name);
        this.sendImages(fd, i);
      }
    }
  }

  sendImages(fd: FormData, i: number): void {
    this.resourceService.addImage(fd).subscribe(
      (resp) => {
        this.images[i] = { id: resp.id, img: resp.img, loader: false };
        this.sendValue.emit(this.images);
      },
      () => {
        this.notificationService.send.error(error);
      }
    );
  }

  openFileWindow(input: HTMLElement): void {
    input.dispatchEvent(new MouseEvent('click'));
  }
}

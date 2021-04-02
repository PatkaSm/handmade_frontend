import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { timeStamp } from 'node:console';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import {
  deleteErrorMessage,
  deleteMessage,
  error,
  loadDataError,
} from 'src/app/core/consts/messages';
import { colorsConst, daysConst } from 'src/app/core/consts/offer.const';
import { IComment } from 'src/app/core/interfaces/comment.interface';
import { IOffer } from 'src/app/core/interfaces/offer.interfaces';
import { AuthService } from 'src/app/core/services/auth.service';
import { OfferService } from 'src/app/core/services/offer.service';
import { LoadingSpinnerService } from 'src/app/shared/loading-spinner/loading-spinner.service';
import { ModalService } from 'src/app/shared/modal/modal.service';
import { NotificationService } from 'src/app/shared/notification/notification.service';

@Component({
  selector: 'app-offer-details',
  templateUrl: './offer-details.component.html',
  styleUrls: ['./offer-details.component.scss'],
})
export class OfferDetailsComponent implements OnDestroy {
  offer: IOffer;
  offerID: number;
  subscription: Subscription = new Subscription();
  colors: { [key: string]: string } = colorsConst;
  days: { [key: string]: string } = daysConst;
  comments: IComment[];
  modalID = (this.modalService.generatedId + 2).toString();

  constructor(
    public activatedRoute: ActivatedRoute,
    private offerService: OfferService,
    private notificationService: NotificationService,
    private loadingSpinnerService: LoadingSpinnerService,
    public authService: AuthService,
    public modalService: ModalService
  ) {
    const param$ = activatedRoute.params.subscribe((param) => {
      this.offerID = param.id;
      this.getOffer();
    });
    this.subscription.add(param$);
  }

  getOffer() {
    this.loadingSpinnerService.setLoaderValue(true);
    this.offerService
      .getOfferDetails(this.offerID)
      .pipe(
        finalize(() => {
          this.loadingSpinnerService.setLoaderValue(false);
        })
      )
      .subscribe(
        (resp) => {
          this.offer = resp;
        },
        () => {
          this.notificationService.send.error(loadDataError);
        }
      );
  }

  deleteOffer() {
    this.offerService.deleteOffer(this.offerID).subscribe(
      (resp) => {
        this.notificationService.send.success(deleteMessage('ofertę'));
        this.modalService.close(this.modalID);
      },
      () => {
        this.notificationService.send.error(deleteErrorMessage('oferty'));
      }
    );
  }

  likeToggle() {
    this.offerService.likeToggle(this.offerID).subscribe(
      (resp) => {
        this.notificationService.send.success(resp.success);
        this.getOffer();
      },
      () => {
        this.notificationService.send.error(error);
      }
    );
  }

  setAsSold() {
    this.offerService.update(this.offerID, { sold: true }).subscribe(
      (resp) => {
        this.notificationService.send.success(
          'Oferta pomyślnie oznaczona jako sprzedana'
        );
        this.getOffer();
      },
      () => {
        this.notificationService.send.error(error);
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

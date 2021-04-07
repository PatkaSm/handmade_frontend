import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import {
  deleteErrorMessage,
  deleteMessage,
  error,
  loadDataError,
  offerAvaliable,
  sold,
} from 'src/app/core/consts/messages';
import { colorsConst, daysConst } from 'src/app/core/consts/offer.const';
import { Category } from 'src/app/core/enums/category';
import { IComment } from 'src/app/core/interfaces/comment.interface';
import { IOffer } from 'src/app/core/interfaces/offer.interfaces';
import { AuthService } from 'src/app/core/services/auth.service';
import { ChatService } from 'src/app/core/services/chat.service';
import { OfferService } from 'src/app/core/services/offer.service';
import { LoadingSpinnerService } from 'src/app/shared/loading-spinner/loading-spinner.service';
import { ModalService } from 'src/app/shared/modal/modal.service';
import { NotificationService } from 'src/app/shared/notification/notification.service';

/**
 * Offer details component
 */
@Component({
  selector: 'app-offer-details',
  templateUrl: './offer-details.component.html',
  styleUrls: ['./offer-details.component.scss'],
})
export class OfferDetailsComponent implements OnDestroy {
  /**
   * Offer data
   */
  offer: IOffer;

  /**
   * Offer ID
   */
  offerID: number;

  /**
   * Subscriptions
   */
  subscription: Subscription = new Subscription();

  /**
   * Colors values
   */
  colors: { [key: string]: string } = colorsConst;

  /**
   * Days values
   */
  days: { [key: string]: string } = daysConst;

  /**
   * Offer comments
   */
  comments: IComment[];

  /**
   * Delete modal ID
   */
  modalID = (this.modalService.generatedId + 2).toString();

  /**
   * Offer categories
   */
  category = Category;

  /**
   * Messages thread ID
   */
  threadID: number;

  /**
   * Offer details component constructor
   * @param activatedRoute Angular activated route
   * @param offerService Offer service
   * @param notificationService Notification Service
   * @param loadingSpinnerService Loading spinner service
   * @param authService Authorisation service
   * @param modalService Modal service
   * @param chatService Chat service
   */
  constructor(
    public activatedRoute: ActivatedRoute,
    private offerService: OfferService,
    private notificationService: NotificationService,
    private loadingSpinnerService: LoadingSpinnerService,
    public authService: AuthService,
    public modalService: ModalService,
    private chatService: ChatService
  ) {
    const param$ = activatedRoute.params.subscribe((param) => {
      this.offerID = param.id;
      this.getOffer();
    });
    this.subscription.add(param$);
  }

  /**
   * Get offer details
   */
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
          if (this.authService.isLogged) {
            this.getUserThread();
          }
        },
        () => {
          this.notificationService.send.error(loadDataError);
        }
      );
  }

  /**
   * Delete offer
   */
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

  /**
   * Like offer toggle
   */
  likeToggle() {
    if (this.authService.isLogged) {
      this.offerService.likeToggle(this.offerID).subscribe(
        (resp) => {
          this.notificationService.send.success(resp.success);
          this.getOffer();
        },
        () => {
          this.notificationService.send.error(error);
        }
      );
    } else {
      this.notificationService.send.error(
        'Musisz się zalogować aby dodać przedmiot do ulubionych'
      );
    }
  }

  /**
   * Set as sold
   */
  soldToggle() {
    this.offerService
      .update(this.offerID, { sold: this.offer.sold ? false : true })
      .subscribe(
        (resp) => {
          this.notificationService.send.success(
            this.offer.sold ? offerAvaliable : sold
          );
          this.getOffer();
        },
        () => {
          this.notificationService.send.error(error);
        }
      );
  }

  /**
   * Get messages thread ID
   */
  getUserThread() {
    this.chatService.getUserThread(this.offer.owner.id).subscribe(
      (resp) => {
        this.threadID = resp.id;
      },
      (error) => {
        this.notificationService.send.error(error);
      }
    );
  }

  /**
   * On destroy unsubscribe subscription
   */
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

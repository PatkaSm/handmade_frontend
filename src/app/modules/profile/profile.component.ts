import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import {
  errorMessage,
  loadDataError,
  succesMessage,
} from 'src/app/core/consts/messages';
import { IOffer } from 'src/app/core/interfaces/offer.interfaces';
import { IUserData } from 'src/app/core/interfaces/user.interface';
import { AuthService } from 'src/app/core/services/auth.service';
import { OfferService } from 'src/app/core/services/offer.service';
import { ProfileService } from 'src/app/core/services/profile.service';
import { LoadingSpinnerService } from 'src/app/shared/loading-spinner/loading-spinner.service';
import { NotificationService } from 'src/app/shared/notification/notification.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnDestroy {
  /**
   * User data
   */
  user: IUserData;

  /**
   * User ID
   */
  userID: number;

  /**
   * USer offers
   */
  userOffers: IOffer[] = [];

  /**
   * Edit image flag
   */
  editImage: boolean;

  /**
   * Image
   */
  image: File;

  /**
   * Localy loaded images
   */
  urls = new Array<string>();

  /**
   * ThreadID
   */
  threadID: number;

  /**
   * Pagination
   */
  pagination = {
    page: 1,
    limit: 15,
  };

  /**
   * Object limit
   */
  loadSize = 15;

  /**
   * Offset
   */
  offset = 0;

  /**
   * Total items amount
   */
  totalItems = 0;

  /**
   * From controls
   */
  controls = {
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    phoneNumber: new FormControl(''),
    city: new FormControl(''),
    email: new FormControl(''),
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
   * Profile component constructor
   * @param profileService Profile service
   * @param activatedRoute Angular Activated route
   * @param offersService Offers Service
   * @param notificationService Notification Service
   * @param loadingSpinnerService Loading spinner service
   * @param authService Authentication service
   */
  constructor(
    private profileService: ProfileService,
    private activatedRoute: ActivatedRoute,
    private offersService: OfferService,
    private notificationService: NotificationService,
    private loadingSpinnerService: LoadingSpinnerService,
    public authService: AuthService
  ) {
    const param$ = activatedRoute.params.subscribe((param) => {
      this.userID = Number(param.id);
      if (
        !this.authService.isLogged ||
        this.userID !== this.authService.myData?.id
      ) {
        this.form.disable();
      }
      this.getUser();
      this.getUserOffers();
    });
    this.subscription.add(param$);
  }

  /**
   *
   * @param $event Pagination output method
   */
  onPaginationOutput($event: any) {
    this.loadSize = $event.limit;
    this.pagination.page = $event.page;
    this.pagination.limit = $event.limit;
    this.getUserOffers();
  }

  /**
   * Get user data
   */
  getUser() {
    this.loadingSpinnerService.setLoaderValue(true);
    this.profileService
      .getUser(this.userID)
      .pipe(
        finalize(() => {
          this.loadingSpinnerService.setLoaderValue(false);
        })
      )
      .subscribe(
        (response) => {
          this.user = response;
          this.assignToControls(this.user);
        },
        () => {
          this.notificationService.send.error(loadDataError);
        }
      );
  }

  /**
   * Pagination get data
   * @param page page number
   */
  getData(page = this.pagination.page) {
    this.offset = (page - 1) * this.pagination.limit;
    this.getUserOffers();
  }

  /**
   * Get users offers
   */
  getUserOffers() {
    this.offersService
      .getUserOffers(this.userID, { limit: this.loadSize, offset: this.offset })
      .subscribe((response) => {
        this.userOffers = response.results;
        this.totalItems = response.count;
      });
  }

  /**
   * Show edit image form
   */
  showEditImage() {
    this.editImage = !this.editImage;
  }

  /**
   * Get images
   * @param event event
   */
  getImages(event) {
    this.urls = [];
    this.image = event.target.files[0];
    if (event.target.files) {
      for (let file of event.target.files) {
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.urls.push(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    }
  }

  /**
   * Save images
   */
  sendImage() {
    const fd = new FormData();
    fd.append('image', this.image, this.image.name);
    this.profileService.sendUserData(this.userID, fd).subscribe(
      () => {
        this.notificationService.send.success(succesMessage);
        this.getUser();
        this.showEditImage();
      },
      () => {
        this.notificationService.send.error(errorMessage);
      }
    );
  }

  /**
   * Submit uptade user form
   */
  submitForm() {
    this.profileService.sendUserData(this.userID, this.getFormData()).subscribe(
      (res) => {
        this.notificationService.send.success(succesMessage);
      },
      () => {
        this.notificationService.send.error(errorMessage);
      }
    );
  }

  /**
   * Get threadID
   */
  getUserThread() {
    // this.chatService.getUserThread(this.userID).subscribe(
    //   (resp) => {
    //     console.log(resp);
    //     this.threadID = resp.id;
    //   },
    //   (error) => throwError(error)
    // );
  }

  /**
   * Assign data to controls
   * @param user user data
   */
  private assignToControls(user: IUserData) {
    this.controls.firstName.setValue(user.first_name);
    this.controls.lastName.setValue(user.last_name);
    this.controls.phoneNumber.setValue(user.phone_number);
    this.controls.city.setValue(user.city);
    this.controls.email.setValue(user.email);
  }

  /**
   * Get form values
   * @returns form data
   */
  private getFormData() {
    return {
      first_name: this.controls.firstName.value,
      last_name: this.controls.lastName.value,
      email: this.controls.email.value,
      phone_number: this.controls.phoneNumber.value,
      city: this.controls.city.value,
    };
  }

  /**
   * On destrou unsubscribe subscription
   */
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

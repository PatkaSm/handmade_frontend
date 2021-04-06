import { Component, OnDestroy, OnInit } from '@angular/core';
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
import { IImage } from 'src/app/core/interfaces/offer.interfaces';
import { IPost } from 'src/app/core/interfaces/post.interfaces';
import { CategoryService } from 'src/app/core/services/category.service';
import { ForumService } from 'src/app/core/services/forum.service';
import { UtilsService } from 'src/app/core/services/utils.service';
import { NotificationService } from 'src/app/shared/notification/notification.service';

/**
 * Add/edit post component
 */
@Component({
  selector: 'app-add-edit-post',
  templateUrl: './add-edit-post.component.html',
  styleUrls: ['./add-edit-post.component.scss'],
})
export class AddEditPostComponent implements OnInit, OnDestroy {
  /**
   * Post iages
   */
  images: IImage[] = [];

  /**
   * Post category
   */
  categories: { id: number; value: string }[] = [];

  /**
   * Post ID
   */
  id: number;

  /**
   * Form controls
   */
  controls = {
    title: new FormControl(''),
    content: new FormControl(''),
    category: new FormControl(''),
  };

  /**
   * Form
   */
  form: FormGroup = new FormGroup({ ...this.controls });

  /**
   * Subscription
   */
  subscription$: Subscription = new Subscription();

  /**
   * Add/edit component constructor
   * @param categoryService Category service
   * @param router Angular router
   * @param activatedRoute Angular Activated route
   * @param notificationService Notification service
   * @param forumService Form service
   */
  constructor(
    private categoryService: CategoryService,
    private router: Router,
    public activatedRoute: ActivatedRoute,
    private notificationService: NotificationService,
    private forumService: ForumService
  ) {
    const param$ = activatedRoute.params.subscribe((param) => {
      this.id = param.id;
      if (this.id) {
        this.getPostDetails();
      }
    });
    this.subscription$.add(param$);
  }

  /**
   * On init get categories
   */
  ngOnInit(): void {
    this.getCategories();
  }

  /**
   * Submit form (add of update)
   */
  submit() {
    const request = this.id
      ? this.forumService.editPost(this.id, this.getData())
      : this.forumService.addPost(this.getData());
    request.subscribe(
      (response) => {
        this.notificationService.send.success(
          this.id ? succesMessage : succesSave('ogłoszenie')
        );
        this.router.navigateByUrl(`forum/post/${this.id}`);
      },
      (error) => {
        this.notificationService.send.error(errorMessage);
        UtilsService.handleControlError(this.controls, error.error, {
          title: 'title',
          content: 'content',
          category: 'category',
          non_field_errors: 'password',
        });
      }
    );
  }

  /**
   * Get images
   * @param event images
   */
  getImages(event) {
    this.images = event;
  }

  /**
   * Assign post data to controls
   * @param post post data
   */
  private assignToControls(post: IPost) {
    this.controls.title.setValue(post.title);
    this.controls.content.setValue(post.content);
    this.images = post.gallery;
    this.controls.category.setValue(post.category);
  }

  /**
   * Get categories
   */
  getCategories() {
    this.categoryService.getCoreCategories().subscribe(
      (response) => {
        this.categories = response.map((element) => ({
          id: element.id,
          value: element.name,
        }));
      },
      () => {
        this.notificationService.send.error(loadDataError);
      }
    );
  }

  /**
   * Get form data
   * @returns form values
   */
  private getData() {
    return {
      content: this.controls.content.value,
      title: this.controls.title.value,
      category: this.controls.category.value,
      gallery: this.images.map((element) => element.id),
    };
  }

  /**
   * Get post details
   */
  private getPostDetails() {
    this.forumService.getPostDetails(this.id).subscribe(
      (resp) => {
        this.assignToControls(resp);
      },
      () => {
        this.notificationService.send.error(loadDataError);
      }
    );
  }

  /**
   * On component destroy unsubscribe all subscriptions
   */
  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }
}

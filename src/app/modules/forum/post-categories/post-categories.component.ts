import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { loadDataError } from 'src/app/core/consts/messages';
import { ICategory } from 'src/app/core/interfaces/category.interface';
import { IPost } from 'src/app/core/interfaces/post.interfaces';
import { CategoryService } from 'src/app/core/services/category.service';
import { ForumService } from 'src/app/core/services/forum.service';
import { LoadingSpinnerService } from 'src/app/shared/loading-spinner/loading-spinner.service';
import { NotificationService } from 'src/app/shared/notification/notification.service';

/**
 * Forum categories view component
 */
@Component({
  selector: 'app-post-categories',
  templateUrl: './post-categories.component.html',
  styleUrls: ['./post-categories.component.scss'],
})
export class PostCategoriesComponent implements OnInit {
  /**
   * Categories
   */
  categories: ICategory[];

  /**
   * Last posts
   */
  posts: IPost[];

  /**
   * Forum categories view component constructor
   * @param notificationService Notification service
   * @param loadingSpinnerService Loading spinner service
   * @param categoriesService Categories service
   * @param forumService Forum service
   */
  constructor(
    private notificationService: NotificationService,
    private loadingSpinnerService: LoadingSpinnerService,
    private categoriesService: CategoryService,
    private forumService: ForumService
  ) {}

  /**
   * On init get categories ang last posts
   */
  ngOnInit(): void {
    this.getCategories();
    this.getPosts();
  }

  /**
   * Get categories
   */
  getCategories() {
    this.loadingSpinnerService.setLoaderValue(true);
    this.categoriesService
      .getCoreCategories()
      .pipe(
        finalize(() => {
          this.loadingSpinnerService.setLoaderValue(false);
        })
      )
      .subscribe(
        (resp) => {
          this.categories = resp;
        },
        () => {
          this.notificationService.send.error(loadDataError);
        }
      );
  }

  /**
   * Get posts
   */
  getPosts() {
    this.forumService.getPosts({ limit: 10, offset: 0 }).subscribe(
      (resp) => {
        this.posts = resp.results;
      },
      () => {
        this.notificationService.send.error(loadDataError);
      }
    );
  }
}

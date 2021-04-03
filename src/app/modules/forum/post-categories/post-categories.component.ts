import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { loadDataError } from 'src/app/core/consts/messages';
import { ICategory } from 'src/app/core/interfaces/category.interface';
import { IPost } from 'src/app/core/interfaces/post.interfaces';
import { CategoryService } from 'src/app/core/services/category.service';
import { ForumService } from 'src/app/core/services/forum.service';
import { LoadingSpinnerService } from 'src/app/shared/loading-spinner/loading-spinner.service';
import { NotificationService } from 'src/app/shared/notification/notification.service';

@Component({
  selector: 'app-post-categories',
  templateUrl: './post-categories.component.html',
  styleUrls: ['./post-categories.component.scss'],
})
export class PostCategoriesComponent implements OnInit {
  categories: ICategory[];
  posts: IPost[];

  constructor(
    private notificationService: NotificationService,
    private loadingSpinnerService: LoadingSpinnerService,
    private categoriesService: CategoryService,
    private forumService: ForumService
  ) {}

  ngOnInit(): void {
    this.getCategories();
    this.getPosts();
  }

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

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { loadDataError } from 'src/app/core/consts/messages';
import { IPost } from 'src/app/core/interfaces/post.interfaces';
import { ForumService } from 'src/app/core/services/forum.service';
import { LoadingSpinnerService } from 'src/app/shared/loading-spinner/loading-spinner.service';
import { NotificationService } from 'src/app/shared/notification/notification.service';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss'],
})
export class ForumComponent implements OnInit {
  posts: IPost[];
  categoryName: string;
  controls = {
    search: new FormControl(''),
  };

  form = new FormGroup(this.controls);

  /**
   * Pagination
   */
  pagination = {
    page: 1,
    limit: 15,
  };

  /**
   * Pagination limit
   */
  loadSize = 15;

  /**
   * Pagination offset
   */
  offset = 0;

  /**
   * Pagination total items
   */
  totalItems = 0;
  subscription: Subscription = new Subscription();

  constructor(
    private notificationService: NotificationService,
    private loadingSpinnerService: LoadingSpinnerService,
    private forumService: ForumService,
    public activatedRoute: ActivatedRoute
  ) {
    const param$ = activatedRoute.params.subscribe((param) => {
      this.categoryName = param.categoryName;
      this.getPosts();
    });
    this.subscription.add(param$);
  }

  ngOnInit(): void {}

  /**
   *
   * @param $event Pagination select output event
   */
  onPaginationOutput($event: any) {
    this.loadSize = $event.limit;
    this.pagination.page = $event.page;
    this.pagination.limit = $event.limit;
    this.getPosts();
  }

  getPosts() {
    this.loadingSpinnerService.setLoaderValue(true);
    this.forumService
      .getPosts({ category__name: this.categoryName })
      .pipe(
        finalize(() => {
          this.loadingSpinnerService.setLoaderValue(false);
        })
      )
      .subscribe(
        (resp) => {
          this.posts = resp.results;
          this.totalItems = resp.count;
        },
        () => {
          this.notificationService.send.error(loadDataError);
        }
      );
  }

  /**
   * Pagination method
   * @param page Page number
   */
  getData(page = this.pagination.page) {
    this.offset = (page - 1) * this.pagination.limit;
    this.getPosts();
  }
}

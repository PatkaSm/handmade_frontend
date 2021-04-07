import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  commentAddSucces,
  errorMessage,
  loadDataError,
} from 'src/app/core/consts/messages';
import { IComment } from 'src/app/core/interfaces/comment.interface';
import { AuthService } from 'src/app/core/services/auth.service';
import { CommentService } from 'src/app/core/services/comment.service';
import { NotificationService } from 'src/app/shared/notification/notification.service';

/**
 * Comments component
 */
@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit {
  /**
   * Offer ID
   */
  @Input() offerID: number;

  /**
   * Offer comments
   */
  comments: IComment[];
  /**
   * Pagination
   */
  pagination = {
    page: 1,
    limit: 5,
  };

  /**
   * Pagination limit
   */
  loadSize = 5;

  /**
   * Pagination offset
   */
  offset = 0;

  /**
   * Pagination total items
   */
  totalItems = 0;

  /**
   * Form controls
   */
  controls = {
    content: new FormControl(''),
  };

  /**
   * Form
   */
  form = new FormGroup(this.controls);

  /**
   * Comments component constructor
   * @param commentService Comments service
   * @param notificationService Notification service
   * @param authService Authorization service
   */
  constructor(
    private commentService: CommentService,
    private notificationService: NotificationService,
    public authService: AuthService
  ) {}

  /**
   * On init get offer comments
   */
  ngOnInit(): void {
    this.getComments();
  }

  /**
   * Get comments
   */
  getComments() {
    this.commentService
      .getComments(this.offerID, { limit: this.loadSize, offset: this.offset })
      .subscribe(
        (response) => {
          this.comments = response.results;
          this.totalItems = response.count;
        },
        () => {
          this.notificationService.send.error(loadDataError);
        }
      );
  }

  /**
   *
   * @param $event Pagination select output event
   */
  onPaginationOutput($event: any) {
    this.loadSize = $event.limit;
    this.pagination.page = $event.page;
    this.pagination.limit = $event.limit;
    this.getComments();
  }

  /**
   * Pagination method
   * @param page Page number
   */
  getData(page = this.pagination.page) {
    this.offset = (page - 1) * this.pagination.limit;
    this.getComments();
  }

  /**
   * Add comment
   */
  submit() {
    this.commentService
      .addComments({
        offer: this.offerID,
        content: this.controls.content.value,
      })
      .subscribe(
        (resp) => {
          this.notificationService.send.success(commentAddSucces);
          this.getComments();
          this.form.reset();
        },
        () => {
          this.notificationService.send.error(errorMessage);
        }
      );
  }
}

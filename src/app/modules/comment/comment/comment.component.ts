import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  deleteErrorMessage,
  deleteMessage,
  errorMessage,
  succesMessage,
} from 'src/app/core/consts/messages';
import { IComment } from 'src/app/core/interfaces/comment.interface';
import { AuthService } from 'src/app/core/services/auth.service';
import { CommentService } from 'src/app/core/services/comment.service';
import { ModalService } from 'src/app/shared/modal/modal.service';
import { NotificationService } from 'src/app/shared/notification/notification.service';

/**
 * Comment component
 */
@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit {
  /**
   * Check if is editable flag
   */
  editable = false;

  /**
   * Delete modal ID
   */
  modalID = (this.modalService.generatedId + 1).toString();

  /**
   * Get comments output
   */
  @Output() getComments: EventEmitter<void> = new EventEmitter();

  /**
   * Comment data
   */
  @Input() comment: IComment;

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
   * Comment component constructor
   * @param authService Authentication service
   * @param commentService Comment service
   * @param notificationService Notification service
   * @param modalService Modal service
   */
  constructor(
    public authService: AuthService,
    private commentService: CommentService,
    private notificationService: NotificationService,
    public modalService: ModalService
  ) {}

  /**
   * On init set comment content value
   */
  ngOnInit(): void {
    this.controls.content.setValue(this.comment.content);
  }

  /**
   * Editable toggle
   */
  editComment() {
    this.editable = !this.editable;
  }

  /**
   * Submit comment update
   */
  submit() {
    this.commentService
      .updateComments(this.comment.id, this.form.value)
      .subscribe(
        (resp) => {
          this.editable = !this.editable;
          this.notificationService.send.success(succesMessage);
          this.getComments.emit();
        },
        () => {
          this.notificationService.send.error(errorMessage);
        }
      );
  }

  /**
   * Delete comment
   */
  deleteComment() {
    this.commentService.deleteComment(this.comment.id).subscribe(
      (resp) => {
        this.notificationService.send.success(deleteMessage('komentarz'));
        this.modalService.close(this.modalID);
        this.getComments.emit();
      },
      () => {
        this.notificationService.send.error(deleteErrorMessage('komentarza'));
      }
    );
  }
}

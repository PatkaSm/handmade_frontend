import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { createUserAccount } from 'src/app/core/consts/messages';
import { AuthService } from 'src/app/core/services/auth.service';
import { UtilsService } from 'src/app/core/services/utils.service';
import { ModalService } from 'src/app/shared/modal/modal.service';
import { NotificationService } from 'src/app/shared/notification/notification.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  /**
   * Modal ID
   */
  modalID = (this.modalService.generatedId + 1).toString();

  /**
   * Form controls
   */
  controls = {
    email: new FormControl(),
    nickname: new FormControl(),
    firstName: new FormControl(),
    lastName: new FormControl(),
    password: new FormControl(),
    submitPassword: new FormControl(),
  };

  /**
   * Form
   */
  form = new FormGroup(this.controls);

  /**
   *
   * @param modalService Modal service
   * @param authService Authentication service
   * @param notificationService Notificaton service
   */
  constructor(
    public modalService: ModalService,
    private authService: AuthService,
    public notificationService: NotificationService
  ) {}

  /**
   * Form submit
   */
  submit() {
    if (this.controls.password.value !== this.controls.submitPassword.value) {
      this.controls.submitPassword.setErrors({
        error: 'Hasła muszą być takie same',
      });
    } else {
      this.authService.registerWithEmail(this.getData()).subscribe(
        (resp) => {
          this.notificationService.send.success(
            createUserAccount(resp.nickname)
          );
          this.modalService.open(this.modalID);
        },
        (error) => {
          UtilsService.handleControlError(this.controls, error.error, {
            email: 'email',
            password: 'password',
            first_name: 'firstName',
            last_name: 'lastName',
            nickname: 'nickname',
            non_field_errors: 'email',
          });
        }
      );
    }
  }

  /**
   * Get for data
   */
  private getData() {
    return {
      email: this.controls.email.value,
      nickname: this.controls.nickname.value,
      first_name: this.controls.firstName.value,
      last_name: this.controls.lastName.value,
      password: this.controls.password.value,
    };
  }
}

import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from 'src/app/core/enums/category';
import { AuthService } from 'src/app/core/services/auth.service';
import { UtilsService } from 'src/app/core/services/utils.service';
import { ModalService } from 'src/app/shared/modal/modal.service';

/**
 * Loin component
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  /**
   * Modal ID
   */
  @Input() modalID;

  /**
   * Form controls
   */
  controls = {
    email: new FormControl(),
    password: new FormControl(),
  };

  /**
   * Form
   */
  form = new FormGroup(this.controls);

  /**
   * Login component constructor
   * @param modalService
   * @param authServie
   * @param router
   */
  constructor(
    public modalService: ModalService,
    private authServie: AuthService,
    private router: Router
  ) {}

  /**
   * Submit login
   */
  submitLogin() {
    this.authServie.loginWithEmail(this.getData()).subscribe(
      () => {
        this.authServie.getMe();
        this.modalService.close(this.modalID);
        this.router.navigateByUrl(`/offers/${Category.All}`);
      },
      (error) => {
        UtilsService.handleControlError(this.controls, error.error, {
          username: 'email',
          password: 'password',
          non_field_errors: 'password',
        });
      }
    );
  }

  /**
   * Get form values
   */
  private getData() {
    return {
      username: this.controls.email.value,
      password: this.controls.password.value,
    };
  }
}

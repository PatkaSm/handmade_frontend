import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from 'src/app/core/enums/category';
import { AuthService } from 'src/app/core/services/auth.service';
import { UtilsService } from 'src/app/core/services/utils.service';
import { ModalService } from 'src/app/shared/modal/modal.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @Input() modalID;
  controls = {
    email: new FormControl(),
    password: new FormControl(),
  };

  form = new FormGroup(this.controls);
  constructor(
    public modalService: ModalService,
    private authServie: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

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

  private getData() {
    return {
      username: this.controls.email.value,
      password: this.controls.password.value,
    };
  }
}

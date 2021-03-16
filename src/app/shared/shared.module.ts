import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationComponent } from './notification/notification.component';
import { ModalComponent } from './modal/modal.component';
import { PaginationComponent } from './pagination/pagination.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormSelectComponent } from './form-select/form-select.component';
import { FormTextareaComponent } from './form-textarea/form-textarea.component';
import { FormInputComponent } from './form-input/form-input.component';
import { FormRadioComponent } from './form-radio/form-radio.component';
import { FormToggleSwitchComponent } from './form-toggle-switch/form-toggle-switch.component';
import { FormCheckboxComponent } from './form-checkbox/form-checkbox.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { DeleteModalComponent } from './modal/delete-modal/delete-modal.component';
import { HeaderComponent } from '../modules/layout/header/header.component';
import { NavComponent } from '../modules/layout/nav/nav.component';
import { CategoriesComponent } from '../modules/layout/categories/categories.component';

const components = [
  NotificationComponent,
  ModalComponent,
  PaginationComponent,
  FormInputComponent,
  FormSelectComponent,
  FormTextareaComponent,
  FormRadioComponent,
  FormToggleSwitchComponent,
  FormCheckboxComponent,
  LoadingSpinnerComponent,
  DeleteModalComponent,
  HeaderComponent,
  NavComponent,
  CategoriesComponent,
];

@NgModule({
  declarations: [...components],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [...components, FormsModule, ReactiveFormsModule],
})
export class SharedModule {}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.scss'],
})
export class FormInputComponent {
  /**
   * Input label
   *
   * @type {string}
   */
  @Input() labelType = 1;

  /**
   * Input label
   *
   * @type {string}
   */
  @Input() label: string;
  /**
   * Input show star in label if true
   *
   * @type {boolean}
   */
  @Input() requireLabelType: boolean;

  /**
   * Input Name
   *
   * @type {string}
   */
  @Input() name: string;

  /**
   * Form Group
   *
   * @type {FormGroup}
   */
  @Input() form: FormGroup;

  /**
   * Input form control
   *
   * @type {FormControl}
   */
  @Input() control: FormControl;

  /**
   * If init datepicker
   */
  @Input() datepicker: boolean = false;

  /**
   * Input type
   */
  @Input() type = 'text';

  /**
   * Input type
   */
  @Input() id = null;

  /**
   * Autocomplete
   */
  @Input() autocomplete = true;

  /**
   * Is input disabled
   */
  @Input() disabled = false;

  /**
   * Max length
   */
  @Input() maxlength = null;

  /**
   * Keydown event emitter
   */
  @Output() keyDownEvent: EventEmitter<any> = new EventEmitter();

  /**
   * Is input focus
   */
  public focusState = false;

  /**
   * @ignore
   */
  constructor() {}

  /**
   * On keydown emit event
   *
   * @param args Arguments
   */
  public onKeyDown(args: any): void {
    this.keyDownEvent.emit(args);
  }

  /**
   * Set focus on input
   *
   * @param state Focus status
   */
  public setFocus(state) {
    this.focusState = state;
  }

  changeInput(value) {
    if (this.datepicker) {
      this.control.setValue(value);
    }
  }
}

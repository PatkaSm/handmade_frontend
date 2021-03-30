import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-toggle-switch',
  templateUrl: './form-toggle-switch.component.html',
  styleUrls: ['./form-toggle-switch.component.scss'],
})
export class FormToggleSwitchComponent implements OnInit {
  /**
   * Input label
   * @type {string}
   */
  @Input() labelType = 1;

  /**
   * Input label
   * @type {string}
   */
  @Input() label: string;
  /**
   * Input show star in label if true
   * @type {boolean}
   */
  @Input() requireLabelType: boolean;

  /**
   * Input Name
   * @type {string}
   */
  @Input() name: string;

  @Input() activeText = 'Aktywna';
  @Input() inactiveText = 'Niektywna';

  /**
   * Form Group
   * @type {FormGroup}
   */
  @Input() form: FormGroup;

  /**
   * Input form control
   * @type {FormControl}
   */
  @Input() control: FormControl;

  /**
   * Input type
   */
  @Input() id = null;

  /**
   * Autocomplete
   */
  @Input() autocomplete = true;

  @Input() maxlength = null;

  @Output() onChangeEvent: EventEmitter<any> = new EventEmitter();
  @Output() onFocusEvent: EventEmitter<void> = new EventEmitter();

  /**
   * @ignore
   */
  constructor() {}

  /**
   * @ignore
   */
  ngOnInit() {}

  onFocus() {
    this.onFocusEvent.emit();
  }

  onChange() {
    this.onChangeEvent.emit(this.control.value);
  }
}

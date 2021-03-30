import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-checkbox',
  templateUrl: './form-checkbox.component.html',
  styleUrls: ['./form-checkbox.component.scss'],
})
export class FormCheckboxComponent implements OnInit {
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
   * Input type
   */
  @Input() id = '';

  /**
   * Keydown event emitter
   */
  @Output() keyDownEvent: EventEmitter<any> = new EventEmitter();

  /**
   * Show errors in component
   */
  @Input() public showErrors = true;

  /**
   * Is checkbox focus
   */
  public focusState = false;

  /**
   * @ignore
   */
  constructor() {}

  /**
   * @ignore
   */
  ngOnInit() {}

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
}

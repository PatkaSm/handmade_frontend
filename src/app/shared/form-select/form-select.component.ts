import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-select',
  templateUrl: './form-select.component.html',
  styleUrls: ['./form-select.component.scss'],
})
export class FormSelectComponent implements OnInit {
  /**
   * Select values
   *
   * @memberof FormSelectComponent
   */
  @Input() values: {
    id: string | number;
    value: string | number;
  }[] = [];

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
  @Input() type = 'text';

  /**
   * Input type
   */
  @Input() id = null;

  /**
   * Autocomplete
   */
  @Input() autocomplete = true;

  @Input() maxlength = null;

  @Output() changeEvent: EventEmitter<any> = new EventEmitter();

  public get selected() {
    return typeof this.control.value === 'object' && this.control.value !== null
      ? this.control.value.id
      : this.control.value;
  }

  /**
   * @ignore
   */
  constructor() {}

  /**
   * @ignore
   */
  ngOnInit() {}

  public onChange(args: any): void {
    this.changeEvent.emit(args);
  }
}

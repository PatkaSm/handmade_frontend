import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-form-textarea',
  templateUrl: './form-textarea.component.html',
  styleUrls: ['./form-textarea.component.scss'],
})
export class FormTextareaComponent {
  @ViewChild('textarea') textAreaRef: ElementRef;

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
   * Input placeholder
   *
   * @type {string}
   */
  @Input() placeholder = '';
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
   * Input Rows
   * @type {string}
   */
  @Input() rows = 1;

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

  @Output() keyDownEvent: EventEmitter<any> = new EventEmitter();

  private sub$ = new Subscription();

  /**
   * @ignore
   */
  constructor() {}

  ngAfterViewInit() {
    this.autoGrow();

    this.sub$.add(
      this.control.valueChanges.subscribe(() => {
        this.autoGrow();
      })
    );
  }

  autoGrow() {
    if (this.textAreaRef.nativeElement.scrollHeight > 0) {
      this.textAreaRef.nativeElement.style.height = '0px';
      this.textAreaRef.nativeElement.style.height =
        this.textAreaRef.nativeElement.scrollHeight + 'px';
      return;
    }
  }

  public onKeyDown(args: any): void {
    this.keyDownEvent.emit(args);
  }

  ngOnDestroy() {
    this.sub$.unsubscribe();
  }
}

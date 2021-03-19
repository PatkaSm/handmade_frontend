import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-svg',
  templateUrl: './svg.component.html',
  styleUrls: ['./svg.component.scss'],
})
export class SvgComponent {
  /**
   * Icon name
   */
  @Input() name: string;

  /**
   * Top value of icon
   */
  @Input() top = '0px';

  @Input() color: '' | 'blue' | 'brown' | 'white' | 'green' | 'grey' | 'red' =
    '';

  /**
   * Icon size
   */
  @Input() size: '' | '20' | '25' | '50' | '100' = '25';

  /**
   * Default path to icons
   */
  public svgPath = 'assets/icons/';
  constructor() {}
}

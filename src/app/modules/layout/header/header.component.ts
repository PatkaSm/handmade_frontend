import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  controls = {
    search: new FormControl(),
  };

  form = new FormGroup(this.controls);

  constructor() {}

  ngOnInit(): void {}
}

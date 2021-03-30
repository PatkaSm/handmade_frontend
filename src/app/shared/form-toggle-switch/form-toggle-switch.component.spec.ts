import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormToggleSwitchComponent } from './form-toggle-switch.component';

describe('FormToggleSwitchComponent', () => {
  let component: FormToggleSwitchComponent;
  let fixture: ComponentFixture<FormToggleSwitchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormToggleSwitchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormToggleSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

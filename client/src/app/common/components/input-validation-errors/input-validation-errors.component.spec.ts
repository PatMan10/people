import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputValidationErrorsComponent } from './input-validation-errors.component';

describe('InputValidationErrorsComponent', () => {
  let component: InputValidationErrorsComponent;
  let fixture: ComponentFixture<InputValidationErrorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputValidationErrorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputValidationErrorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

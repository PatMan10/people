import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HandleInputComponent } from './handle-input.component';

describe('HandleInputComponent', () => {
  let component: HandleInputComponent;
  let fixture: ComponentFixture<HandleInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HandleInputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HandleInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

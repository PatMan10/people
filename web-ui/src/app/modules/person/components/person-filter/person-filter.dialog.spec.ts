import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonFilterDialog } from './person-filter.dialog';

describe('PersonFilterDialogComponent', () => {
  let component: PersonFilterDialog;
  let fixture: ComponentFixture<PersonFilterDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonFilterDialog ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonFilterDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

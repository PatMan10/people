import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonFilterDialogComponent } from './person-filter-dialog.component';

describe('PersonFilterDialogComponent', () => {
  let component: PersonFilterDialogComponent;
  let fixture: ComponentFixture<PersonFilterDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonFilterDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonFilterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

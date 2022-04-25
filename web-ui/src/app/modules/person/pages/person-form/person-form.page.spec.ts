import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonFormPage } from './person-form.page';

describe('PersonFormComponent', () => {
  let component: PersonFormPage;
  let fixture: ComponentFixture<PersonFormPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonFormPage ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

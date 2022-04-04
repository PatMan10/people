import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonListPage } from './person-list.page';

describe('PersonListComponent', () => {
  let component: PersonListPage;
  let fixture: ComponentFixture<PersonListPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonListPage ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

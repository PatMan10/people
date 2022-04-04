import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonDetailPage } from './person-detail.page';

describe('PersonDetailComponent', () => {
  let component: PersonDetailPage;
  let fixture: ComponentFixture<PersonDetailPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonDetailPage ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

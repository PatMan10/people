import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailPage } from './user-detail.page';

describe('UserDetailComponent', () => {
  let component: UserDetailPage;
  let fixture: ComponentFixture<UserDetailPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserDetailPage ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

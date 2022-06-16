import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoDialog } from './info.dialog';

describe('InfoDialogComponent', () => {
  let component: InfoDialog;
  let fixture: ComponentFixture<InfoDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoDialog ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

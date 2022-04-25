import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoModal } from './info.modal';

describe('InfoComponent', () => {
  let component: InfoModal;
  let fixture: ComponentFixture<InfoModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoModal ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

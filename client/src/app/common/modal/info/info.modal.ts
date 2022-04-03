import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-info',
  templateUrl: './info.modal.html',
  styleUrls: ['./info.modal.scss'],
})
export class InfoModal implements OnInit {
  title = 'Info';
  message: string[] = [];

  constructor(private readonly activeModal: NgbActiveModal) {}

  ngOnInit(): void {}

  dismiss(reason: string) {
    this.activeModal.dismiss(reason);
  }

  close(result: string) {
    this.activeModal.close(result);
  }
}

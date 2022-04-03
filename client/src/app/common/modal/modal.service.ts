import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { InfoModal } from './info/info.modal';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  constructor(private readonly ngbModal: NgbModal) {}

  info(message: string[]) {
    const modalRef = this.ngbModal.open(InfoModal);
    const inst: InfoModal = modalRef.componentInstance;
    inst.message = message;
    return modalRef.result;
  }
}

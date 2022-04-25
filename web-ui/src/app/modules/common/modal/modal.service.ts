import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { InfoModal, InfoModalData } from './info/info.modal';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  constructor(private readonly ngbModal: NgbModal) {}

  info(data: InfoModalData) {
    const modalRef = this.ngbModal.open(InfoModal);
    const inst: InfoModal = modalRef.componentInstance;
    inst.data = data;
    return modalRef.result;
  }
}
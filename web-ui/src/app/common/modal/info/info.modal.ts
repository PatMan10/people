import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-info',
  templateUrl: './info.modal.html',
  styleUrls: ['./info.modal.scss'],
})
export class InfoModal implements OnInit {
  data = new InfoModalData();

  constructor(private readonly activeModal: NgbActiveModal) {}

  ngOnInit(): void {}

  dismiss() {
    this.activeModal.dismiss();
  }

  close() {
    this.activeModal.close();
  }
}

export type InfoModalType = 'info' | 'warn' | 'error';

export class InfoModalData {
  constructor(
    readonly type: InfoModalType = 'info',
    readonly title: string = '',
    readonly message: string[] = []
  ) {}
}

@Pipe({ name: 'bc' })
export class GetBootstrapColorPipe implements PipeTransform {
  transform(type: InfoModalType): string {
    if (type === 'error') return 'danger';
    if (type === 'warn') return 'warning';
    return 'info';
  }
}

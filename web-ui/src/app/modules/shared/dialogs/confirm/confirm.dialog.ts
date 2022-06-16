import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.dialog.html',
  styleUrls: ['./confirm.dialog.scss'],
})
export class ConfirmDialog {
  constructor(
    @Inject(MAT_DIALOG_DATA) public readonly data: ConfirmDialogData
  ) {}
}

export class ConfirmDialogData {
  constructor(readonly title: string, readonly message: string) {}
}

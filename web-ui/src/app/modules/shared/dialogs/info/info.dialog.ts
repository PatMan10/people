import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-info',
  templateUrl: './info.dialog.html',
  styleUrls: ['./info.dialog.scss'],
})
export class InfoDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public readonly data: InfoDialogData) {}
}

export class InfoDialogData {
  constructor(readonly title: string, readonly message: string[]) {}
}

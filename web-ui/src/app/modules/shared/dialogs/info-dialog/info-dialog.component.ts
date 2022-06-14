import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-info-dialog',
  templateUrl: './info-dialog.component.html',
  styleUrls: ['./info-dialog.component.scss'],
})
export class InfoDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public readonly data: InfoDialogData) {}
}

export class InfoDialogData {
  constructor(readonly title: string, readonly message: string[]) {}
}

import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import {
  InfoDialogData,
  InfoDialogComponent,
} from './info-dialog/info-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(public dialog: MatDialog) {}

  info(data: InfoDialogData): void {
    this.dialog.open(InfoDialogComponent, {
      width: '450px',
      data,
    });
  }
}

import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';

import {
  InfoDialogData,
  InfoDialogComponent,
} from './info-dialog/info-dialog.component';
import {
  ConfirmDialogData,
  ConfirmDialogComponent,
} from './confirm-dialog/confirm-dialog.component';

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

  confirm(data: ConfirmDialogData): Observable<boolean> {
    return this.dialog
      .open(ConfirmDialogComponent, {
        width: '450px',
        data,
      })
      .afterClosed();
  }
}

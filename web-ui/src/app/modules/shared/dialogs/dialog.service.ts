import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';

import {
  InfoDialogData,
  InfoDialog,
} from './info/info.dialog';
import {
  ConfirmDialogData,
  ConfirmDialog,
} from './confirm/confirm.dialog';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(public dialog: MatDialog) {}

  info(data: InfoDialogData): void {
    this.dialog.open(InfoDialog, {
      width: '450px',
      data,
    });
  }

  confirm(data: ConfirmDialogData): Observable<boolean> {
    return this.dialog
      .open(ConfirmDialog, {
        width: '450px',
        data,
      })
      .afterClosed();
  }
}

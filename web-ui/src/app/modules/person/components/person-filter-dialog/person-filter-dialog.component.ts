import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

import { buildFormGroup } from '../../../shared/utils/form';
import { Obj } from '../../../shared/models/generic.model';

@Component({
  selector: 'app-person-filter-dialog',
  templateUrl: './person-filter-dialog.component.html',
  styleUrls: ['./person-filter-dialog.component.scss'],
})
export class PersonFilterDialogComponent implements OnInit {
  form = buildFormGroup(new PersonQuery());

  constructor(public dialogRef: MatDialogRef<PersonFilterDialogComponent>) {}

  ngOnInit(): void {}

  close() {
    this.dialogRef.close(this.form.value);
  }
}

export class PersonQuery {
  'name.first' = '';
  'name.last' = '';
  'birthday' = '';
}

import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { buildFormGroup } from '../../../shared/utils/form';
import { Obj } from '../../../shared/models/generic.model';

@Component({
  selector: 'app-person-filter',
  templateUrl: './person-filter.dialog.html',
  styleUrls: ['./person-filter.dialog.scss'],
})
export class PersonFilterDialog implements OnInit {
  form = buildFormGroup(new PersonQueryValues());

  constructor(
    public readonly dialogRef: MatDialogRef<PersonFilterDialog>,
    @Inject(MAT_DIALOG_DATA) public readonly data?: PersonQueryValues
  ) {
    if (data) this.form.patchValue(data);
  }

  ngOnInit(): void {}

  close() {
    this.dialogRef.close(this.form.value);
  }

  clear() {
    this.form.patchValue(new PersonQueryValues());
    this.dialogRef.close(this.form.value);
  }
}

export class PersonQueryValues extends Obj<string> {
  'name.first' = '';
  'name.middle' = '';
  'name.last' = '';
  'name.nick' = '';

  'contact.phone.type' = '';
  'contact.phone.number' = '';
  'contact.email.type' = '';
  'contact.email.address' = '';

  'birthday' = '';
}

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';

import { Person } from '../../person.model';
import { PersonApi } from '../../person.api';
import { UiUrls } from '../../../../utils/urls';
import { GetByQueryDto } from '../../../shared/models/http.model';
import {
  PersonFilterDialog,
  PersonQueryValues,
} from '../person-filter/person-filter.dialog';
import {
  dateToApiFormat,
  EntityQuery,
  Obj,
} from '../../../shared/models/generic.model';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.scss'],
})
export class PersonListComponent implements OnInit {
  readonly urls = UiUrls;
  payload$: Observable<GetByQueryDto<Person>>;
  columns = ['first name', 'last name', 'birthday'];
  queryValues = new PersonQueryValues();

  constructor(
    private readonly dialog: MatDialog,
    private readonly api: PersonApi
  ) {
    this.payload$ = api.getByQuery();
  }

  ngOnInit(): void {}

  filter() {
    const dialogRef = this.dialog.open(PersonFilterDialog, {
      width: '450px',
      data: this.queryValues,
    });
    dialogRef.afterClosed().subscribe((pqValues: PersonQueryValues) => {
      if (!pqValues) return;

      const { birthday } = pqValues;
      if (birthday) pqValues.birthday = dateToApiFormat(new Date(birthday));

      this.queryValues = pqValues;
      const values = new Obj<string[]>();
      Object.keys(pqValues)
        .filter((k) => pqValues[k])
        .forEach((k) => (values[k] = pqValues[k].split(',')));

      const q = new EntityQuery(values);
      this.payload$ = this.api.getByQuery(q);
    });
  }
}

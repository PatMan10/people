import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';

import { Person } from '../../person.model';
import { PersonApi } from '../../person.api';
import { UiUrls } from '../../../../utils/urls';
import { GetByQueryDto } from '../../../shared/models/http.model';
import { PersonFilterDialogComponent } from '../person-filter-dialog/person-filter-dialog.component';
import { EntityQuery, Obj } from '../../../shared/models/generic.model';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.scss'],
})
export class PersonListComponent implements OnInit {
  readonly urls = UiUrls;
  payload$: Observable<GetByQueryDto<Person>>;
  columns = ['first name', 'last name', 'birthday'];

  constructor(
    private readonly dialog: MatDialog,
    private readonly api: PersonApi
  ) {
    this.payload$ = api.getByQuery();
  }

  ngOnInit(): void {}

  filter() {
    const dialogRef = this.dialog.open(PersonFilterDialogComponent, {
      width: '450px',
    });
    dialogRef.afterClosed().subscribe((filter: Obj<string>) => {
      const values = new Obj<string[]>();
      Object.keys(filter)
        .filter((k) => filter[k])
        .forEach((k) => (values[k] = filter[k].split(',')));

      const q = new EntityQuery(values);
      console.log(q);
      this.payload$ = this.api.getByQuery(q);
    });
  }
}

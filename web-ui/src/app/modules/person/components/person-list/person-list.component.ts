import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { QueryResponse } from '../../../shared/models/generic.model';
import { Person } from '../../person.model';
import { PersonApi } from '../../person.api';
import { UiUrls } from '../../../shared/utils/urls';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.scss'],
})
export class PersonListComponent implements OnInit {
  readonly urls = UiUrls;
  payload$: Observable<QueryResponse<Person>>;

  constructor(api: PersonApi) {
    this.payload$ = api.getByQuery();
  }

  ngOnInit(): void {}
}

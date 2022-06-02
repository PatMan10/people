import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Person } from '../../person.model';
import { PersonApi } from '../../person.api';
import { UiUrls } from '../../../shared/utils/urls';
import {GetByQueryDto} from "../../../shared/models/http.model";

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.scss'],
})
export class PersonListComponent implements OnInit {
  readonly urls = UiUrls;
  payload$: Observable<GetByQueryDto<Person>>;

  constructor(api: PersonApi) {
    this.payload$ = api.getByQuery();
  }

  ngOnInit(): void {}
}

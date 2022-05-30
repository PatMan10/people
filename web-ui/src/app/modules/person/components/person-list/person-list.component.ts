import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Person } from 'src/app/modules/person/person.model';
import { PersonApi } from 'src/app/modules/person/person.api';
import { UiUrls } from 'src/app/modules/shared/utils/urls';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.scss'],
})
export class PersonListComponent implements OnInit {
  readonly urls = UiUrls;
  people$: Observable<Person[]>;

  constructor(api: PersonApi) {
    this.people$ = api.getByQuery();
  }

  ngOnInit(): void {}
}

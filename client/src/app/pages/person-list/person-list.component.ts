import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Person } from 'src/app/models/person.model';
import { PeopleService } from 'src/app/services/people.service';
import { UiUrls } from 'src/app/utils/urls';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.scss'],
})
export class PersonListComponent implements OnInit {
  Urls = UiUrls;
  people$: Observable<Person[]>;

  constructor(peopleService: PeopleService) {
    this.people$ = peopleService.getAll();
  }

  ngOnInit(): void {}
}

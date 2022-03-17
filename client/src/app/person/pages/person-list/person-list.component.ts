import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Person } from 'src/app/person/person.model';
import { PersonService } from 'src/app/person/person.service';
import { UiUrls } from 'src/app/common/utils/urls';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.scss'],
})
export class PersonListComponent implements OnInit {
  Urls = UiUrls;
  people$: Observable<Person[]>;

  constructor(peopleService: PersonService) {
    this.people$ = peopleService.getAll();
  }

  ngOnInit(): void {}
}

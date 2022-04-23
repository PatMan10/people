import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Person } from 'src/app/person/person.model';
import { PersonService } from 'src/app/person/person.service';
import { UiUrls } from 'src/app/common/utils/urls';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.page.html',
  styleUrls: ['./person-list.page.scss'],
})
export class PersonListPage implements OnInit {
  Urls = UiUrls;
  people$: Observable<Person[]>;

  constructor(peopleService: PersonService) {
    this.people$ = peopleService.getByQuery();
  }

  ngOnInit(): void {}
}

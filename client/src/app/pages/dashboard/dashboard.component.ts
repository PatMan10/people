import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PeopleService } from 'src/app/services/people.service';
import { UiUrls } from 'src/app/utils/urls';
import { Person } from '../../models/person.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  Urls = UiUrls;
  people$: Observable<Person[]>;

  constructor(peopleService: PeopleService) {
    this.people$ = peopleService.getAll();
  }

  ngOnInit(): void {}
}

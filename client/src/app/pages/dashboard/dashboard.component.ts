import { Component, OnInit } from '@angular/core';
import { PeopleService } from 'src/app/services/people.service';
import {Person} from "../../models/person.model";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  people: Person[] = [];

  constructor(private peopleService: PeopleService) {}

  ngOnInit(): void {
    this.peopleService.getAll().subscribe((people) => {
      this.people = people;
    });
  }
}

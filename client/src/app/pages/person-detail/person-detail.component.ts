import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Person } from 'src/app/models/person.model';
import { PeopleService } from 'src/app/services/people.service';
import { UiUrls } from 'src/app/utils/urls';

@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.component.html',
  styleUrls: ['./person-detail.component.scss'],
})
export class PersonDetailComponent implements OnInit {
  readonly Urls = UiUrls;
  person$: Observable<Person> = of(new Person());

  constructor(
    private peopleService: PeopleService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') as string;
    this.person$ = this.peopleService.getById(id);
  }

  delete(id: string) {
    this.peopleService.delete(id).subscribe(() => {
      this.router.navigate([UiUrls.people.viewAll()]);
    });
  }
}

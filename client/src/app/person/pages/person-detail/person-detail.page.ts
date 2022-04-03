import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Person } from 'src/app/person/person.model';
import { PersonService } from 'src/app/person/person.service';
import { UiUrls } from 'src/app/common/utils/urls';

@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.page.html',
  styleUrls: ['./person-detail.page.scss'],
})
export class PersonDetailPage implements OnInit {
  readonly Urls = UiUrls;
  person$: Observable<Person> = of(new Person());

  constructor(
    private peopleService: PersonService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') as string;
    this.person$ = this.peopleService.getById(id);
  }

  delete(id: string) {
    this.peopleService.delete(id).subscribe(() => {
      this.router.navigate([UiUrls.person.viewAll()]);
    });
  }
}

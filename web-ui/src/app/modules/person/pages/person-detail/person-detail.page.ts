import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Person } from 'src/app/modules/person/person.model';
import { PersonService } from 'src/app/modules/person/person.service';
import { UiUrls } from 'src/app/modules/shared/utils/urls';
import { ErrorHandlingService } from 'src/app/modules/shared/services/error-handling.service';

@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.page.html',
  styleUrls: ['./person-detail.page.scss'],
})
export class PersonDetailPage implements OnInit {
  readonly Urls = UiUrls;
  person$: Observable<Person> = of(new Person());

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private peopleService: PersonService,
    private erService: ErrorHandlingService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') as string;
    this.person$ = this.peopleService.getById(id);
  }

  delete(id: string) {
    this.peopleService.delete(id).subscribe({
      next: () => {
        this.router.navigate([UiUrls.person.viewAll()]);
      },
      error: this.erService.handleHttpError('delete person', new Person()),
    });
  }
}

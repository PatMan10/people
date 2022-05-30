import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Person } from 'src/app/modules/person/person.model';
import { PersonApi } from 'src/app/modules/person/person.api';
import { UiUrls } from 'src/app/modules/shared/utils/urls';
import { ErrorService } from 'src/app/modules/shared/services/error.service';

@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.component.html',
  styleUrls: ['./person-detail.component.scss'],
})
export class PersonDetailComponent implements OnInit {
  readonly urls = UiUrls;
  person$ = of(new Person());

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly api: PersonApi,
    private readonly err: ErrorService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') as string;
    this.person$ = this.api.getById(id);
  }

  delete(id: string) {
    this.api.delete(id).subscribe({
      next: () => {
        this.router.navigate([UiUrls.person.viewAll()]);
      },
      error: this.err.handleHttpError('delete person', new Person()),
    });
  }
}

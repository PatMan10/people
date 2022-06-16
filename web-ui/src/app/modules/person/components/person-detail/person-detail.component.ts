import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';

import { Person } from 'src/app/modules/person/person.model';
import { PersonApi } from 'src/app/modules/person/person.api';
import { UiUrls } from 'src/app/utils/urls';
import { ErrorService } from 'src/app/modules/shared/services/error.service';
import { DialogService } from 'src/app/modules/shared/dialogs/dialog.service';
import { ConfirmDialogData } from 'src/app/modules/shared/dialogs/confirm/confirm.dialog';

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
    private readonly err: ErrorService,
    private readonly dialog: DialogService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') as string;
    this.person$ = this.api.getById(id);
  }

  delete(id: string) {
    this.dialog
      .confirm(
        new ConfirmDialogData(
          'confirm',
          'Are you sure you want to delete this person?'
        )
      )
      .subscribe((yes) => {
        if (yes)
          this.api.delete(id).subscribe({
            next: () => {
              this.router.navigate([UiUrls.person.list()]);
            },
            error: this.err.handleHttpError('delete person', new Person()),
          });
      });
  }
}

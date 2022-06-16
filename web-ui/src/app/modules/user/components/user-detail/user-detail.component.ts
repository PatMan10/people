import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';

import { GetUserDto } from 'src/app/modules/user/user.model';
import { UserApi } from 'src/app/modules/user/user.api';
import { UiUrls } from 'src/app/utils/urls';
import { ErrorService } from 'src/app/modules/shared/services/error.service';
import { DialogService } from 'src/app/modules/shared/dialogs/dialog.service';
import { ConfirmDialogData } from 'src/app/modules/shared/dialogs/confirm/confirm.dialog';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent implements OnInit {
  readonly urls = UiUrls;
  user$ = of(new GetUserDto());

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly api: UserApi,
    private readonly err: ErrorService,
    private readonly dialog: DialogService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') as string;
    this.user$ = this.api.getById(id);
  }

  delete(id: string) {
    this.dialog
      .confirm(
        new ConfirmDialogData(
          'confirm',
          'Are you sure you want to delete your account?'
        )
      )
      .subscribe((yes) => {
        if (yes)
          this.api.delete(id).subscribe({
            next: () => {
              this.router.navigate([UiUrls.index()]);
            },
            error: this.err.handleHttpError('delete user', new GetUserDto()),
          });
      });
  }
}

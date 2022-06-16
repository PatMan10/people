import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ValidationError } from 'class-validator';

import { GetUserDto } from 'src/app/modules/user/user.model';
import { UserApi } from 'src/app/modules/user/user.api';
import { UiUrls } from 'src/app/utils/urls';
import {
  buildFormGroup,
  validateForm,
} from 'src/app/modules/shared/utils/form';
import { ErrorService } from 'src/app/modules/shared/services/error.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  readonly urls = UiUrls;

  id: string;
  form = buildFormGroup(new GetUserDto());
  errors: ValidationError[] = [];

  constructor(
    route: ActivatedRoute,
    private readonly router: Router,
    private readonly api: UserApi,
    private readonly err: ErrorService
  ) {
    const id = route.snapshot.paramMap.get('id') as string;
    this.id = id;
    api.getById(id).subscribe((u) => {
      this.form.patchValue(u);
    });
  }

  ngOnInit(): void {}

  async submit() {
    const payload = this.form.value;
    this.errors = await validateForm(GetUserDto, payload);

    if (this.errors.length > 0) return;

    const { id } = this;
    this.api.update(id, payload).subscribe({
      next: () => {
        this.router.navigate([UiUrls.user.detail(id)]);
      },
      error: this.err.handleHttpError('update user', new GetUserDto()),
    });
  }
}

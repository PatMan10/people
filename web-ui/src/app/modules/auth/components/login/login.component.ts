import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ValidationError } from 'class-validator';

import { UiUrls } from '../../../shared/utils/urls';
import { Credentials } from '../../auth.model';
import { AuthApi } from '../../auth.api';
import { buildFormGroup, validateForm } from '../../../shared/utils/form';
import { ErrorService } from 'src/app/modules/shared/services/error.service';
import { GetUserDto } from 'src/app/modules/user/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form = buildFormGroup(new Credentials());
  errors: ValidationError[] = [];

  constructor(
    private readonly router: Router,
    private readonly api: AuthApi,
    private readonly err: ErrorService
  ) {}

  ngOnInit(): void {}

  async submit() {
    this.errors = await validateForm(Credentials, this.form.value);
    if (this.errors.length > 0) return;

    this.api.login(this.form.value).subscribe({
      next: (_user: GetUserDto) => {
        this.router.navigate([UiUrls.person.VIEW_BY_QUERY]);
      },
      error: this.err.handleHttpError('login', undefined),
    });
  }
}

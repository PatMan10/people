import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ValidationError } from 'class-validator';

import { UiUrls } from '../../../../utils/urls';
import { Credentials } from '../../auth.model';
import { AuthApi } from '../../auth.api';
import { buildFormGroup, validateForm } from '../../../shared/utils/form';
import { ErrorService } from 'src/app/modules/shared/services/error.service';

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
    const payload = this.form.value;
    this.errors = await validateForm(Credentials, payload);
    if (this.errors.length > 0) return;

    this.api.login(payload).subscribe({
      next: () => {
        this.router.navigate([UiUrls.person.list()]);
      },
      error: this.err.handleHttpError('login', undefined),
    });
  }
}

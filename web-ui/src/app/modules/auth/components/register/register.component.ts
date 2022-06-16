import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ValidationError } from 'class-validator';

import { UiUrls } from '../../../../utils/urls';
import { CreateUserDto } from '../../../user/user.model';
import { AuthApi } from '../../auth.api';
import { buildFormGroup, validateForm } from '../../../shared/utils/form';
import { ErrorService } from 'src/app/modules/shared/services/error.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  form = buildFormGroup(new CreateUserDto());
  errors: ValidationError[] = [];

  constructor(
    private readonly router: Router,
    private readonly api: AuthApi,
    private readonly err: ErrorService
  ) {}

  ngOnInit(): void {}

  async submit() {
    const payload = this.form.value;
    this.errors = await validateForm(CreateUserDto, payload);
    if (this.errors.length > 0) return;

    this.api.register(payload).subscribe({
      next: () => {
        this.router.navigate([UiUrls.person.list()]);
      },
      error: this.err.handleHttpError('register', undefined),
    });
  }
}

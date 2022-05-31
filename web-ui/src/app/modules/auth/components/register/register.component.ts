import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ValidationError } from 'class-validator';

import { UiUrls } from '../../../shared/utils/urls';
import { CreateUserDto, GetUserDto } from '../../../user/user.model';
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
    this.errors = await validateForm(CreateUserDto, this.form.value);
    if (this.errors.length > 0) return;

    this.api.register(this.form.value).subscribe({
      next: (_user: GetUserDto) => {
        this.router.navigate([UiUrls.person.VIEW_BY_QUERY]);
      },
      error: this.err.handleHttpError('register', undefined),
    });
  }
}

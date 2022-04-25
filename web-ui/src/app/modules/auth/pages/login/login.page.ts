import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ValidationError } from 'class-validator';

import { UiUrls } from '../../../common/utils/urls';
import { Credentials } from '../../auth.model';
import { AuthService } from '../../auth.service';
import { buildFormGroup, validateForm } from '../../../common/utils/form';
import { ErrorHandlingService } from 'src/app/modules/common/services/error-handling.service';
import { GetUserDto } from 'src/app/modules/user/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  form = buildFormGroup(new Credentials());
  errors: ValidationError[] = [];

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly erService: ErrorHandlingService
  ) {}

  ngOnInit(): void {}

  async submit() {
    this.errors = await validateForm(Credentials, this.form.value);
    if (this.errors.length > 0) return;

    this.authService.login(this.form.value).subscribe({
      next: (_user: GetUserDto) => {
        this.router.navigate([UiUrls.person.VIEW_ALL]);
      },
      error: this.erService.handleHttpError('login', undefined),
    });
  }
}

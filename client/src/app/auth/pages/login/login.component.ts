import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ValidationError } from 'class-validator';

import { UiUrls } from '../../../common/utils/urls';
import { Credentials } from '../../auth.model';
import { AuthService } from '../../auth.service';
import { extractErrorMessages } from '../../../common/models/http.model';
import { buildFormGroup, validateForm } from '../../../common/utils/form';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form = buildFormGroup(new Credentials());
  private validationErrors: ValidationError[] = [];

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService
  ) {}

  get emailErrors() {
    const { validationErrors } = this;
    return extractErrorMessages('email', validationErrors);
  }

  get passwordErrors() {
    const { validationErrors } = this;
    return extractErrorMessages('password', validationErrors);
  }

  ngOnInit(): void {}

  async submit() {
    this.validationErrors = await validateForm(Credentials, this.form.value);
    if (this.validationErrors.length > 0) return;

    this.authService.login(this.form.value).subscribe((user) => {
      console.log(user);
      this.router.navigate([UiUrls.person.VIEW_ALL]);
    });
  }
}

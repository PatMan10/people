import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, of } from 'rxjs';

import { UiUrls } from '../../../common/utils/urls';
import { Credentials } from '../../auth.model';
import { AuthService } from '../../auth.service';
import { GetUserDto } from 'src/app/user/user.model';
import {
  ValidationErrorResponse,
  iValidationError,
  extractErrorMessages,
} from '../../../common/models/http.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  validationErrors: iValidationError[] | undefined;
  extractErrorMessages = extractErrorMessages;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    readonly fb: FormBuilder
  ) {
    this.form = fb.group(new Credentials());
  }

  get email() {
    return this.form.get('email') as FormControl;
  }

  get password() {
    return this.form.get('password') as FormControl;
  }

  ngOnInit(): void {}

  async submit() {
    if (!this.form.valid) return;
    console.log('SUBMiT');

    this.authService
      .login(this.form.value)
      .pipe(
        catchError(({ error }: HttpErrorResponse) => {
          const { details } = error as ValidationErrorResponse;
          this.validationErrors = details;
          console.warn(this.validationErrors);
          return of({});
        })
      )
      .subscribe(() => {
        //this.router.navigate([UiUrls.person.VIEW_ALL]);
      });
  }
}

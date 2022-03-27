import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
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
  submitted = false;
  credentials = new Credentials();
  validationErrors: iValidationError[] | undefined;
  extractErrorMessages = extractErrorMessages;

  constructor(
    private readonly authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  submit(e: NgForm) {
    this.submitted = true;
    if (!e.valid) return;

    this.authService
      .login(this.credentials)
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

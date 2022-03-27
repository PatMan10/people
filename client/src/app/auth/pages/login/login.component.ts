import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, of } from 'rxjs';
import { validate, ValidationError } from 'class-validator';
import { plainToInstance } from 'class-transformer';

import { UiUrls } from '../../../common/utils/urls';
import { Credentials } from '../../auth.model';
import { AuthService } from '../../auth.service';
import { GetUserDto } from 'src/app/user/user.model';
import { extractErrorMessages } from '../../../common/models/http.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  private validationErrors: ValidationError[] = [];
  form = this.fb.group(new Credentials());

  constructor(
    private readonly fb: FormBuilder,
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

  private async validateForm() {
    this.validationErrors = await validate(
      plainToInstance(Credentials, this.form.value)
    );
  }

  async submit() {
    await this.validateForm();
    if (this.validationErrors.length > 0) return;

    console.log('SUBMiT');

    this.authService.login(this.form.value).subscribe((user) => {
      console.log(user);
      //this.router.navigate([UiUrls.person.VIEW_ALL]);
    });
  }
}

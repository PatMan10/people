import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UiUrls } from '../../../common/utils/urls';
import { Credentials } from '../../auth.model';
import { AuthService } from '../../auth.service';
import {
  buildFormGroup,
  validateForm,
  ValidationErrorRecord,
} from '../../../common/utils/form';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form = buildFormGroup(new Credentials());
  vErs: ValidationErrorRecord = {};

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService
  ) {}

  ngOnInit(): void {}

  async submit() {
    this.vErs = await validateForm(Credentials, this.form.value);
    console.log(this.vErs);
    if (Object.keys(this.vErs).length > 0) return;

    this.authService.login(this.form.value).subscribe((user) => {
      console.log(user);
      this.router.navigate([UiUrls.person.VIEW_ALL]);
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UiUrls } from '../../../common/utils/urls';
import { CreateUserDto, GetUserDto } from '../../../user/user.model';
import { AuthService } from '../../auth.service';
import {
  buildFormGroup,
  validateForm,
  ValidationErrorRecord,
} from '../../../common/utils/form';
import { ErrorHandlingService } from 'src/app/common/services/error-handling.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  form = buildFormGroup(new CreateUserDto());
  vErs = new ValidationErrorRecord();

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly erService: ErrorHandlingService
  ) {}

  ngOnInit(): void {}

  async submit() {
    const { valid, vErs } = await validateForm(CreateUserDto, this.form.value);
    this.vErs = vErs;
    if (!valid) return;

    this.authService.register(this.form.value).subscribe({
      next: (_user: GetUserDto) => {
        this.router.navigate([UiUrls.person.VIEW_ALL]);
      },
      error: this.erService.handleHttpError('register', undefined),
    });
  }
}

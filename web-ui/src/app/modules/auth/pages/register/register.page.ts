import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ValidationError } from 'class-validator';

import { UiUrls } from '../../../common/utils/urls';
import { CreateUserDto, GetUserDto } from '../../../user/user.model';
import { AuthService } from '../../auth.service';
import { buildFormGroup, validateForm } from '../../../common/utils/form';
import { ErrorHandlingService } from 'src/app/modules/common/services/error-handling.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  form = buildFormGroup(new CreateUserDto());
  errors: ValidationError[] = [];

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly erService: ErrorHandlingService
  ) {}

  ngOnInit(): void {}

  async submit() {
    this.errors = await validateForm(CreateUserDto, this.form.value);
    if (this.errors.length > 0) return;

    this.authService.register(this.form.value).subscribe({
      next: (_user: GetUserDto) => {
        this.router.navigate([UiUrls.person.VIEW_ALL]);
      },
      error: this.erService.handleHttpError('register', undefined),
    });
  }
}

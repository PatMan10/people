import { Component } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import { GenericInputComponent } from '../generic-input.component';

@Component({
  selector: 'app-password-input',
  templateUrl: './password-input.component.html',
  styleUrls: ['./password-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      // eslint-disable-next-line no-use-before-define
      useExisting: PasswordInputComponent,
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      // eslint-disable-next-line no-use-before-define
      useExisting: PasswordInputComponent,
    },
  ],
})
export class PasswordInputComponent extends GenericInputComponent {
  override name = 'password';
  showPassword = false;

  constructor() {
    super();
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}

import { Component } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import { GenericInputComponent } from '../generic-input.component';

@Component({
  selector: 'app-email-input',
  templateUrl: './email-input.component.html',
  styleUrls: ['./email-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      // eslint-disable-next-line no-use-before-define
      useExisting: EmailInputComponent,
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      // eslint-disable-next-line no-use-before-define
      useExisting: EmailInputComponent,
    },
  ],
})
export class EmailInputComponent extends GenericInputComponent {
  override name = 'email';

  constructor() {
    super();
  }
}

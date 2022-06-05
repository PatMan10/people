import { Component } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import { GenericInputComponent } from '../generic-input.component';

@Component({
  selector: 'app-handle-input',
  templateUrl: './handle-input.component.html',
  styleUrls: ['./handle-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      // eslint-disable-next-line no-use-before-define
      useExisting: HandleInputComponent,
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      // eslint-disable-next-line no-use-before-define
      useExisting: HandleInputComponent,
    },
  ],
})
export class HandleInputComponent extends GenericInputComponent {
  override name = 'handle';

  constructor() {
    super();
  }
}

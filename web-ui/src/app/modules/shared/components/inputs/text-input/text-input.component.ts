import { Component } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import { GenericInputComponent } from '../generic-input.component';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      // eslint-disable-next-line no-use-before-define
      useExisting: TextInputComponent,
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      // eslint-disable-next-line no-use-before-define
      useExisting: TextInputComponent,
    },
  ],
})
export class TextInputComponent extends GenericInputComponent {}

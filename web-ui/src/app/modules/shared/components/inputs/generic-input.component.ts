import { Component, OnDestroy, Input } from '@angular/core';
import {
  ControlValueAccessor,
  Validator,
  AbstractControl,
  ValidationErrors,
  FormControl,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { ValidationError } from 'class-validator';

@Component({
  selector: '',
  template: '',
  styles: [''],
})
export abstract class GenericInputComponent
  implements ControlValueAccessor, Validator, OnDestroy
{
  //
  // check out this page for in depth explanation
  // https://blog.angular-university.io/angular-custom-form-controls/
  //

  @Input() label = '';
  // name used to display error messages to user
  @Input() name = 'value';
  // errors used to show messages
  @Input()
  errors: ValidationError[] = [];

  control = new FormControl();
  controlSub: Subscription | undefined = undefined;

  onTouched = () => {};

  writeValue(v: string | number | boolean) {
    this.control.setValue(v);
  }

  registerOnChange(onChange: any) {
    this.controlSub = this.control.valueChanges.subscribe(onChange);
  }

  registerOnTouched(onTouched: any) {
    this.onTouched = onTouched;
  }

  setDisabledState(disabled: boolean) {
    if (disabled) this.control.disable();
    else this.control.enable();
  }

  validate(_ctrl: AbstractControl): ValidationErrors | null {
    return this.control.errors;
  }

  ngOnDestroy() {
    this.controlSub?.unsubscribe();
  }
}

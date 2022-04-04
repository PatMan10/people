import { Pipe, PipeTransform } from '@angular/core';
import { ValidationError } from 'class-validator';

import { extractErrorMessages } from '../utils/form';

@Pipe({ name: 'vErX' })
export class ValidationErrorsExistPipe implements PipeTransform {
  transform(errors: ValidationError[], property: string): boolean {
    return extractErrorMessages(property, errors).length > 0;
  }
}

@Pipe({ name: 'vErs' })
export class GetValidationErrorsPipe implements PipeTransform {
  transform(errors: ValidationError[], property: string): string[] {
    return extractErrorMessages(property, errors);
  }
}

import { Pipe, PipeTransform } from '@angular/core';

import { ValidationErrorRecord, getErrorMessages } from '../utils/form';

@Pipe({ name: 'vErX' })
export class ValidationErrorsExistPipe implements PipeTransform {
  transform(o: ValidationErrorRecord, property: string): boolean {
    return getErrorMessages(property, o).length > 0;
  }
}

@Pipe({ name: 'vErs' })
export class GetValidationErrorsPipe implements PipeTransform {
  transform(o: ValidationErrorRecord, property: string): string[] {
    return getErrorMessages(property, o);
  }
}

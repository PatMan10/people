import { Pipe, PipeTransform } from '@angular/core';

import { ValidationErrorRecord, getErrorMessages } from '../utils/form';

/*
 * Check if validation errors exist for the given property.
 *
 */
@Pipe({ name: 'vEr' })
export class ValidationErrorsExistPipe implements PipeTransform {
  transform(o: ValidationErrorRecord, property: string): boolean {
    return getErrorMessages(property, o).length > 0;
  }
}

/*
 * Get the validation errors for the given property.
 *
 */
@Pipe({ name: 'getVErs' })
export class GetValidationErrorsPipe implements PipeTransform {
  transform(o: ValidationErrorRecord, property: string): string[] {
    return getErrorMessages(property, o);
  }
}

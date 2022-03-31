import { Pipe, PipeTransform } from '@angular/core';

import { ValidationErrorRecord, getErrorMessages } from '../utils/form';

/*
 * Check if validation errors exist for the given property.
 *
 */
@Pipe({ name: 'vEr' })
export class ValidationErrorsExistPipe implements PipeTransform {
  transform(o: ValidationErrorRecord, property: string): boolean {
    console.log('CHECK ER', property);
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
    console.log('GET ER', property);
    return getErrorMessages(property, o);
  }
}

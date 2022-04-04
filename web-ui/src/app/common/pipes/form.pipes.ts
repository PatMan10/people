import { Pipe, PipeTransform } from '@angular/core';
import { FormGroup, FormArray, FormControl } from '@angular/forms';
import { ValidationError } from 'class-validator';

import { extractErrorMessages } from '../utils/form';

@Pipe({ name: 'ersExist' })
export class ValidationErrorsExistPipe implements PipeTransform {
  transform(errors: ValidationError[], property: string): boolean {
    return extractErrorMessages(property, errors).length > 0;
  }
}

@Pipe({ name: 'getErs' })
export class GetValidationErrorsPipe implements PipeTransform {
  transform(errors: ValidationError[], property: string): string[] {
    return extractErrorMessages(property, errors);
  }
}

@Pipe({ name: 'getArr' })
export class GetFormArray implements PipeTransform {
  transform(fg: FormGroup, path: string): FormArray {
    const fa = fg.get(path);
    if (fa && fa instanceof FormArray) return fa;
    return new FormArray([]);
  }
}

import { Pipe, PipeTransform } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
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
export class GetFormArrayPipe implements PipeTransform {
  transform(grp: FormGroup, path: string): FormArray | null {
    const arr = grp.get(path);
    if (arr && arr instanceof FormArray) return arr;
    return null;
  }
}

@Pipe({ name: 'enumToArr' })
export class EnumToArrayPipe implements PipeTransform {
  transform(e: Record<string, string>): string[] {
    return Object.keys(e).map((k) => e[k]);
  }
}

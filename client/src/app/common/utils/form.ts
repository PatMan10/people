import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { validate, ValidationError } from 'class-validator';
import { plainToInstance, ClassConstructor } from 'class-transformer';

export function buildFormGroup(o: Record<string, any>): FormGroup {
  const group = new FormGroup({});

  for (const k in o)
    if (o[k] instanceof Array) group.addControl(k, buildFormArray(o[k]));
    else if (o[k] instanceof Object) group.addControl(k, buildFormGroup(o[k]));
    else group.addControl(k, new FormControl(o[k]));

  return group;
}

export function buildFormArray(a: any[]): FormArray {
  return new FormArray(
    a.map((o) => (o instanceof Object ? buildFormGroup(o) : new FormControl(o)))
  );
}

export async function validateForm(
  cls: ClassConstructor<object>,
  value: Record<string, any>
): Promise<{ valid: boolean; vErs: ValidationErrorRecord }> {
  const errors = await validate(plainToInstance(cls, value));
  return { valid: errors.length === 0, vErs: buildErrorRecord(value, errors) };
}

export function extractErrorMessages(
  property: string,
  errors: ValidationError[]
): string[] {
  for (let i = 0; i < errors.length; i++) {
    const { property: prop, constraints, children } = errors[i];
    if (property === prop && constraints) return Object.values(constraints);

    if (children && children.length > 0)
      return extractErrorMessages(property, children);
  }

  return [];
}

export class ValidationErrorRecord {
  [k: string]: string[] | ValidationErrorRecord;
}

export function buildErrorRecord(
  o: Record<string, any>,
  errors: ValidationError[]
): ValidationErrorRecord {
  const rec = new ValidationErrorRecord();

  for (const k in o)
    if (o[k] instanceof Array) rec[k] = extractErrorMessages(k, errors);
    else if (o[k] instanceof Object) rec[k] = buildErrorRecord(o[k], errors);
    else rec[k] = extractErrorMessages(k, errors);

  return rec;
}

export function getErrorMessages(
  property: string,
  o: ValidationErrorRecord
): string[] {
  for (const k in o) {
    if (k === property) return o[k] as string[];

    if (o[k] instanceof ValidationErrorRecord)
      return getErrorMessages(property, o[k] as ValidationErrorRecord);
  }

  return [];
}

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

export function validateForm(
  cls: ClassConstructor<object>,
  value: Record<string, any>
): Promise<ValidationError[]> {
  return validate(plainToInstance(cls, value));
}

export function extractErrorMessages(
  property: string,
  errors: ValidationError[]
): string[] {
  for (let i = 0; i < errors.length; i++) {
    const { property: prop, constraints } = errors[i];
    if (prop === property && constraints) return Object.values(constraints);
  }

  for (let i = 0; i < errors.length; i++) {
    const { children } = errors[i];

    if (children && children.length > 0)
      return extractErrorMessages(property, children);
  }

  return [];
}

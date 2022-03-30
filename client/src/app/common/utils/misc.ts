import { FormGroup, FormArray, FormControl } from '@angular/forms';
/**
 * Simple deep clone function.
 *
 * @param o - object to clone
 */
export const clone = <T>(o: T) => JSON.parse(JSON.stringify(o));

/**
 * Build a reactive form group from an object.
 *
 * @param o - object to create form group for.
 */

export function buildFormGroup(o: Record<string, any>): FormGroup {
  const group = new FormGroup({});

  for (const k in o)
    if (o[k] instanceof Array) group.addControl(k, buildFormArray(o[k]));
    else if (o[k] instanceof Object) group.addControl(k, buildFormGroup(o[k]));
    else group.addControl(k, new FormControl(o[k]));

  return group;
}

/**
 * Build a reactive form array from an array.
 *
 * @param a - array to create form array for.
 */

export function buildFormArray(a: any[]): FormArray {
  return new FormArray(
    a.map((o) => (o instanceof Object ? buildFormGroup(o) : new FormControl(o)))
  );
}

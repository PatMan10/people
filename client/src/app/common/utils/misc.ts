import { FormGroup, FormArray, FormControl } from '@angular/forms';
/**
 * Simple deep clone function.
 *
 * @param o - object to clone
 */
export const clone = <T>(o: T) => JSON.parse(JSON.stringify(o));

/**
 * Create a reactive form from an object.
 *
 * @param o - object to create form for
 */

export function buildForm(o: Record<string, any>): FormGroup {
  const form = new FormGroup({});

  for (const k in o)
    if (o[k] instanceof Array)
      form.addControl(
        k,
        new FormArray((o[k] as any[]).map((ok: any) => buildForm(o[k])))
      );
    else if (o[k] instanceof Object) form.addControl(k, buildForm(o[k]));
    else form.addControl(k, new FormControl(o[k]));

  return form;
}

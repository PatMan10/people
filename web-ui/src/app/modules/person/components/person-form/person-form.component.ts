import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormControl } from '@angular/forms';
import { ValidationError } from 'class-validator';

import { Person, Phone, Email, PhoneType, EmailType } from '../../person.model';
import { PersonApi } from '../../person.api';
import { UiUrls } from '../../../shared/utils/urls';
import { buildFormGroup, validateForm } from '../../../shared/utils/form';
import { ErrorService } from 'src/app/modules/shared/services/error.service';

type ArrayPath =
  | 'name.middle'
  | 'name.nick'
  | 'contact.email'
  | 'contact.phone';

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.scss'],
})
export class PersonFormComponent implements OnInit {
  readonly PhoneType = PhoneType;
  readonly EmailType = EmailType;

  id: string | null = null;
  title = 'Add Person';
  btnText = 'Add';
  form = buildFormGroup(new Person());
  errors: ValidationError[] = [];

  constructor(
    route: ActivatedRoute,
    private readonly router: Router,
    private readonly api: PersonApi,
    private readonly err: ErrorService
  ) {
    const id = route.snapshot.paramMap.get('id');
    if (id) {
      this.id = id;
      this.title = 'Edit Person';
      this.btnText = 'Save';
      api.getById(id).subscribe((p) => {
        this.form = buildFormGroup(p);
      });
    }
  }

  ngOnInit(): void {}

  addToArr(path: ArrayPath) {
    switch (path) {
      case 'name.middle':
        return (this.form.get(path) as FormArray).push(new FormControl(''));
      case 'name.nick':
        return (this.form.get(path) as FormArray).push(new FormControl(''));
      case 'contact.phone':
        return (this.form.get(path) as FormArray).push(
          buildFormGroup(new Phone())
        );
      case 'contact.email':
        return (this.form.get(path) as FormArray).push(
          buildFormGroup(new Email())
        );
    }
  }

  removeFromArr(path: ArrayPath, index: number) {
    (this.form.get(path) as FormArray).removeAt(index);
  }

  async submit() {
    this.errors = await validateForm(Person, this.form.value);
    console.log(this.errors);

    if (this.errors.length > 0) return;

    this.api.save(this.form.value).subscribe({
      next: () => {
        this.router.navigate([UiUrls.person.LIST]);
      },
      error: this.err.handleHttpError('save person', new Person()),
    });
  }
}

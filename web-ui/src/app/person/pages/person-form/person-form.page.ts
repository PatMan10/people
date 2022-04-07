import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormControl } from '@angular/forms';
import { ValidationError } from 'class-validator';

import {
  Person,
  Phone,
  Email,
  PhoneType,
  EmailType,
} from '../../../person/person.model';
import { PersonService } from '../../../person/person.service';
import { UiUrls } from '../../../common/utils/urls';
import {
  buildFormGroup,
  validateForm,
  extractErrorMessages,
} from '../../../common/utils/form';
import { ErrorHandlingService } from 'src/app/common/services/error-handling.service';

type ArrayPath =
  | 'name.middle'
  | 'name.nick'
  | 'contact.email'
  | 'contact.phone';

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.page.html',
  styleUrls: ['./person-form.page.scss'],
})
export class PersonFormPage implements OnInit {
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
    private readonly peopleService: PersonService,
    private readonly erService: ErrorHandlingService
  ) {
    const id = route.snapshot.paramMap.get('id');
    if (id) {
      this.id = id;
      this.title = 'Edit Person';
      this.btnText = 'Save';
      const $ = peopleService.getById(id).subscribe((p) => {
        this.form = buildFormGroup(p);
        $.unsubscribe();
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
    console.log(this.form);
  }

  removeFromArr(path: ArrayPath, index: number) {
    (this.form.get(path) as FormArray).removeAt(index);
  }

  async submit() {
    this.errors = await validateForm(Person, this.form.value);

    if (this.errors.length > 0) return;

    let $ = this.peopleService.add(this.form.value);
    let operation = 'add person';

    if (this.id) {
      $ = this.peopleService.update(this.id, this.form.value);
      operation = 'update person';
    }

    $.subscribe({
      next: () => {
        this.router.navigate([UiUrls.person.VIEW_ALL]);
      },
      error: this.erService.handleHttpError(operation, new Person()),
    });
  }
}

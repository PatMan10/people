import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ValidationError } from 'class-validator';

import { Person } from '../../../person/person.model';
import { PersonService } from '../../../person/person.service';
import { UiUrls } from '../../../common/utils/urls';
import {
  buildFormGroup,
  validateForm,
  extractErrorMessages,
} from '../../../common/utils/form';
import { ErrorHandlingService } from 'src/app/common/services/error-handling.service';

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.page.html',
  styleUrls: ['./person-form.page.scss'],
})
export class PersonFormPage implements OnInit {
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

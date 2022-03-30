import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { validate, ValidationError } from 'class-validator';
import { plainToInstance } from 'class-transformer';

import { buildFormGroup } from '../../../common/utils/misc';
import { Person } from '../../../person/person.model';
import { PersonService } from '../../../person/person.service';
import { UiUrls } from '../../../common/utils/urls';
import { extractErrorMessages } from '../../../common/models/http.model';

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.scss'],
})
export class PersonFormComponent implements OnInit {
  id: string | null = null;
  title = 'Add Person';
  btnText = 'Add';
  form = buildFormGroup(new Person());
  private validationErrors: ValidationError[] = [];

  constructor(
    route: ActivatedRoute,
    private readonly router: Router,
    private readonly peopleService: PersonService
  ) {
    const id = route.snapshot.paramMap.get('id');
    if (id) {
      this.id = id;
      this.title = 'Edit Person';
      this.btnText = 'Save';
      const $ = peopleService.getById(id).subscribe((p) => {
        this.form = buildFormGroup(p);
        console.warn(this.form);
        $.unsubscribe();
      });
    }
  }

  get nameErrors() {
    const { validationErrors } = this;
    return {
      first: extractErrorMessages('first', validationErrors),
      last: extractErrorMessages('last', validationErrors),
    };
  }

  get birthdayErrors() {
    const { validationErrors } = this;
    return extractErrorMessages('birthday', validationErrors);
  }

  ngOnInit(): void {}

  private async validateForm() {
    this.validationErrors = await validate(
      plainToInstance(Person, this.form.value)
    );
  }

  async submit() {
    await this.validateForm();
    if (this.validationErrors.length > 0) return;

    const operation$ = this.id
      ? this.peopleService.update(this.id, this.form.value)
      : this.peopleService.add(this.form.value);

    operation$.subscribe(() => {
      this.router.navigate([UiUrls.person.VIEW_ALL]);
    });
  }
}

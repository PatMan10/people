import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Person } from '../../../person/person.model';
import { PersonService } from '../../../person/person.service';
import { UiUrls } from '../../../common/utils/urls';
import {
  buildFormGroup,
  validateForm,
  ValidationErrorRecord,
  getErrorMessages,
} from '../../../common/utils/form';

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
  vErs: ValidationErrorRecord = {};

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

  ngOnInit(): void {}

  async submit() {
    const { valid, vErs } = await validateForm(Person, this.form.value);
    this.vErs = vErs;
    if (!valid) return;

    const operation$ = this.id
      ? this.peopleService.update(this.id, this.form.value)
      : this.peopleService.add(this.form.value);

    operation$.subscribe(() => {
      this.router.navigate([UiUrls.person.VIEW_ALL]);
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UiUrls } from '../../../common/utils/urls';
import { Credentials } from '../../auth.model';
import { AuthService } from '../../auth.service';
import {
  buildFormGroup,
  validateForm,
  ValidationErrorRecord,
} from '../../../common/utils/form';
import { ModalService } from '../../../common/modal/modal.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  form = buildFormGroup(new Credentials());
  vErs = new ValidationErrorRecord();

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.modalService.info(['INIT LOGIN PAGE']);
  }

  async submit() {
    const { valid, vErs } = await validateForm(Credentials, this.form.value);
    this.vErs = vErs;
    if (!valid) return;

    this.authService.login(this.form.value).subscribe((user) => {
      console.log(user);
      this.router.navigate([UiUrls.person.VIEW_ALL]);
    });
  }
}

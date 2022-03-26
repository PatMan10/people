import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UiUrls } from '../../../common/utils/urls';
import { Credentials } from '../../auth.model';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  credentials = new Credentials();

  constructor(
    private readonly authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  submit(e: NgForm) {
    if (e.valid === false) return;

    this.authService.login(this.credentials).subscribe(() => {
      this.router.navigate([UiUrls.person.VIEW_ALL]);
    });
  }
}

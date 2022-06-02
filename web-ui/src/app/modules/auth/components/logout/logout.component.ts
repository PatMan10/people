import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UiUrls } from '../../../shared/utils/urls';
import { AuthApi } from '../../auth.api';
import { ErrorService } from '../../../shared/services/error.service';

@Component({ template: '' })
export class LogoutComponent implements OnInit {
  constructor(router: Router, api: AuthApi, err: ErrorService) {
    api.logout().subscribe({
      next: () => router.navigate([UiUrls.INDEX]),
      error: err.handleHttpError('logout', undefined),
    });
  }

  ngOnInit(): void {}
}

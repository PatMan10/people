import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UiUrls } from '../../../shared/utils/urls';
import { AuthService } from '../../auth.service';
import { ErrorHandlingService } from '../../../shared/services/error-handling.service';

@Component({ template: '' })
export class LogoutComponent implements OnInit {
  constructor(
    router: Router,
    authService: AuthService,
    erService: ErrorHandlingService
  ) {
    authService.logout().subscribe({
      next: () => router.navigate([UiUrls.person.VIEW_ALL]),
      error: erService.handleHttpError('logout', undefined),
    });
  }

  ngOnInit(): void {}
}

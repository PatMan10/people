import { Component } from '@angular/core';

import { AuthCache } from './modules/auth/auth.cache';
import { UiUrls } from './modules/shared/utils/urls';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  readonly urls = UiUrls;
  showFiller = false;

  constructor(public readonly auth: AuthCache) {}
}

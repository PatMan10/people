import { Component, ViewChild } from '@angular/core';

import { AuthCache } from './modules/auth/auth.cache';
import { UiUrls } from './utils/urls';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  readonly urls = UiUrls;
  @ViewChild('drawer')
  drawer: any;

  showFiller = false;
  drawerIsOpen = false;

  constructor(public readonly auth: AuthCache) {}

  openDrawer() {
    this.drawerIsOpen = true;
    this.drawer.open();
  }

  closeDrawer() {
    this.drawerIsOpen = false;
    this.drawer.close();
  }
}

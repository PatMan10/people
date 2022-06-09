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

  private readonly body: HTMLElement;
  theme = 'dark-theme-1';

  showFiller = false;
  drawerIsOpen = false;

  constructor(public readonly auth: AuthCache) {
    this.body = document.getElementById('body') as HTMLElement;
    this.body.classList.add(this.theme);
  }

  changeTheme(t: string) {
    this.body.classList.remove(this.theme);
    this.theme = t;
    this.body.classList.add(t);
  }

  openDrawer() {
    this.drawerIsOpen = true;
    this.drawer.open();
  }

  closeDrawer() {
    this.drawerIsOpen = false;
    this.drawer.close();
  }
}

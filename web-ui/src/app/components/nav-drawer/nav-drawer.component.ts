import { Component, OnInit } from '@angular/core';
import { DrawerCache } from 'src/app/services/drawer.cache';
import { UiUrls } from 'src/app/modules/shared/utils/urls';
import { Drawer } from '../../app.utils';
import { AuthCache } from 'src/app/modules/auth/auth.cache';

@Component({
  selector: 'app-nav-drawer',
  templateUrl: './nav-drawer.component.html',
  styleUrls: ['./nav-drawer.component.scss'],
})
export class NavDrawerComponent implements OnInit {
  left = '-250px';
  readonly urls = UiUrls;

  constructor(
    public readonly drawer: DrawerCache,
    public readonly auth: AuthCache
  ) {}

  ngOnInit(): void {
    this.drawer.state.subscribe((s) => {
      this.left = s.openDrawer === Drawer.NAV_DRAWER ? '0px' : '-250px';
    });
  }
}

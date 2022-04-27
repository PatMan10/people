import { Component, OnInit } from '@angular/core';
import { DrawerService } from 'src/app/services/drawer.service';
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
  Urls = UiUrls;

  constructor(
    public readonly drawer: DrawerService,
    public readonly authCache: AuthCache
  ) {}

  ngOnInit(): void {
    this.drawer.state.subscribe((s) => {
      this.left = s.visibleDrawer === Drawer.NAV_DRAWER ? '0px' : '-250px';
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { DrawerService } from 'src/app/services/drawer.service';
import { Drawer } from 'src/app/utils/enums';
import { UiUrls } from 'src/app/utils/urls';

@Component({
  selector: 'app-nav-drawer',
  templateUrl: './nav-drawer.component.html',
  styleUrls: ['./nav-drawer.component.scss'],
})
export class NavDrawerComponent implements OnInit {
  left = '-250px';
  Urls = UiUrls;

  constructor(public drawer: DrawerService) {}

  ngOnInit(): void {
    this.drawer.state.subscribe((s) => {
      this.left = s.visibleDrawer === Drawer.NAV_DRAWER ? '0px' : '-250px';
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { DrawerService } from 'src/app/services/drawer.service';
import { Drawer } from 'src/app/utils/enums';

@Component({
  selector: 'app-nav-drawer',
  templateUrl: './nav-drawer.component.html',
  styleUrls: ['./nav-drawer.component.scss'],
})
export class NavDrawerComponent implements OnInit {
  left: string = '-250px';

  constructor(public drawerService: DrawerService) {}

  ngOnInit(): void {
    this.drawerService.state.subscribe((state) => {
      this.left = state.visibleDrawer === Drawer.NAV_DRAWER ? '0px' : '-250px';
    });
  }
}

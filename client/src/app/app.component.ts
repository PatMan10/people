import { Component, OnInit } from '@angular/core';
import { Drawer, Visibility } from './utils/enums';

export class DrawerMeta {
  constructor(
    readonly visibleDrawer: Drawer,
    readonly overlayVisibility: Visibility
  ) {}
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  drawerMeta: DrawerMeta = new DrawerMeta(Drawer._, Visibility.HIDDEN);

  ngOnInit(): void {
    console.log('init => ', this.drawerMeta);
  }

  openDrawer(drawer: Drawer): void {
    console.log('------ APP COMP => openDrawer ------');
    console.log('drawerMeta b4 => ', this.drawerMeta);
    this.drawerMeta = new DrawerMeta(drawer, Visibility.VISIBLE);
    console.log('drawerMeta after => ', this.drawerMeta);
  }

  closeDrawer(): void {
    console.log('------ APP COMP => closeDrawer ------');
    console.log('drawerMeta b4 => ', this.drawerMeta);
    this.drawerMeta = new DrawerMeta(Drawer._, Visibility.HIDDEN);
    console.log('drawerMeta after => ', this.drawerMeta);
  }
}

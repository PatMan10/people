import { Component, OnInit } from '@angular/core';
import { Drawer, Visibility } from './utils/enums';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  visibleDrawer: Drawer = Drawer._;
  overlayVisibility: Visibility = Visibility.HIDDEN;

  ngOnInit(): void {}

  openDrawer = (d: Drawer) => this._openDrawer(d);
  private _openDrawer(drawer: Drawer): void {
    this.visibleDrawer = drawer;
    this.overlayVisibility = Visibility.VISIBLE;
  }

  closeDrawer = () => this._closeDrawer();
  private _closeDrawer(): void {
    this.visibleDrawer = Drawer._;
    this.overlayVisibility = Visibility.HIDDEN;
  }
}

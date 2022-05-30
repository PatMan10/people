import { Component, OnInit } from '@angular/core';
import { DrawerCache } from 'src/app/services/drawer.cache';
import { Drawer } from '../../app.utils';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  readonly Drawer = Drawer;

  constructor(readonly drawer: DrawerCache) {}

  ngOnInit(): void {}
}

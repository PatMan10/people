import { Component, OnInit } from '@angular/core';
import { DrawerService } from 'src/app/services/drawer.service';
import { Drawer } from '../../app.utils';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  readonly Drawer = Drawer;

  constructor(readonly drawer: DrawerService) {}

  ngOnInit(): void {}
}

import { Component, OnInit } from '@angular/core';
import { DrawerService } from 'src/app/common/services/drawer.service';
import { Drawer } from 'src/app/common/utils/enums';

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

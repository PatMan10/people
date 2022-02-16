import { Component, OnInit, Input } from '@angular/core';
import { Drawer } from 'src/app/utils/enums';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  Drawer = Drawer;
  @Input() openDrawer: (d: Drawer) => void = (d: Drawer) => {};

  constructor() {}

  ngOnInit(): void {}
}

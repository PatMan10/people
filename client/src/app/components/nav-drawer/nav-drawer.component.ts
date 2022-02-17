import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Drawer } from 'src/app/utils/enums';

@Component({
  selector: 'app-nav-drawer',
  templateUrl: './nav-drawer.component.html',
  styleUrls: ['./nav-drawer.component.scss'],
})
export class NavDrawerComponent implements OnInit, OnChanges {
  @Input() visibleDrawer: Drawer = Drawer._;
  left: string = '-250px';

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    const { visibleDrawer } = changes;
    this.left =
      visibleDrawer.currentValue === Drawer.NAV_DRAWER ? '0px' : '-250px';
  }
}

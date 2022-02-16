import { Component, OnInit, Input } from '@angular/core';
import { Visibility } from 'src/app/utils/enums';

@Component({
  selector: 'app-nav-drawer',
  templateUrl: './nav-drawer.component.html',
  styleUrls: ['./nav-drawer.component.scss'],
})
export class NavDrawerComponent implements OnInit {
  @Input() visibility: Visibility = Visibility._;

  constructor() {}

  ngOnInit(): void {}
}

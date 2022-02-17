import { Component, OnInit, Input } from '@angular/core';
import { Visibility } from 'src/app/utils/enums';

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.scss'],
})
export class OverlayComponent implements OnInit {
  Visibility = Visibility;
  @Input() visibility: Visibility = Visibility._;
  @Input() closeDrawer: () => void = () => {};

  constructor() {}

  ngOnInit(): void {}
}

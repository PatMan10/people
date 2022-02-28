import { Component, OnInit, Input } from '@angular/core';
import { Visibility } from 'src/app/utils/enums';

@Component({
  selector: 'app-backdrop',
  templateUrl: './backdrop.component.html',
  styleUrls: ['./backdrop.component.scss'],
})
export class BackdropComponent implements OnInit {
  Visibility = Visibility;
  @Input() visibility: Visibility = Visibility._;
  @Input() closeDrawer: () => void = () => {};

  constructor() {}

  ngOnInit(): void {}
}

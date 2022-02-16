import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Visibility } from 'src/app/utils/enums';

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.scss'],
})
export class OverlayComponent implements OnInit, OnChanges {
  Visibility = Visibility;
  @Input() visibility: Visibility = Visibility._;
  @Input() closeDrawer: () => void = () => {};

  constructor() {}

  ngOnInit(): void {
    console.log('overlayVisibility => ', this.visibility);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes in overlay comp => ');
    console.log(changes);
  }
}

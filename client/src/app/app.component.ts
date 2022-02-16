import { Component } from '@angular/core';
import { Visibility } from './utils/enums';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  overlayVisibility: Visibility = Visibility.HIDDEN;
  navDrawerVisibility: Visibility = Visibility.HIDDEN;
}

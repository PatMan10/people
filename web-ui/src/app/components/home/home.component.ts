import { Component, OnInit } from '@angular/core';
import { UiUrls } from '../../modules/shared/utils/urls';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  readonly urls = UiUrls;

  constructor() {}

  ngOnInit(): void {}
}

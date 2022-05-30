import { Component, OnInit } from '@angular/core';
import { DrawerCache } from 'src/app/services/drawer.cache';
import {Visibility} from "../../app.utils";

@Component({
  selector: 'app-backdrop',
  templateUrl: './backdrop.component.html',
  styleUrls: ['./backdrop.component.scss'],
})
export class BackdropComponent implements OnInit {
  readonly Visibility = Visibility;
  visibility = Visibility.HIDDEN;

  constructor(public drawer: DrawerCache) {}

  ngOnInit(): void {
    this.drawer.state.subscribe((s) => {
      this.visibility = s.backdropVisibility;
    });
  }
}

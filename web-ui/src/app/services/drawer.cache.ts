import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Drawer, Visibility } from '../app.utils';

@Injectable({
  providedIn: 'root',
})
export class DrawerCache {
  private stateSub = new Subject<DrawerState>();

  constructor() {
    this.stateSub.next(new DrawerState());
  }

  get state$(): Observable<DrawerState> {
    return this.stateSub.asObservable();
  }

  open(drawer: Drawer): void {
    this.stateSub.next(new DrawerState(drawer, Visibility.VISIBLE));
  }

  close(): void {
    this.stateSub.next(new DrawerState());
  }
}

export class DrawerState {
  constructor(
    readonly openDrawer = Drawer._,
    readonly backdropVisibility = Visibility.HIDDEN
  ) {}
}

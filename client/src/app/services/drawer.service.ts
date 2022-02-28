import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Drawer, Visibility } from '../utils/enums';

@Injectable({
  providedIn: 'root',
})
export class DrawerService {
  private stateSub = new Subject<DrawerService.State>();

  constructor() {
    this.stateSub.next(new DrawerService.State());
  }

  get state(): Observable<DrawerService.State> {
    return this.stateSub.asObservable();
  }

  open(drawer: Drawer): void {
    this.stateSub.next(new DrawerService.State(drawer, Visibility.VISIBLE));
  }

  close(): void {
    this.stateSub.next(new DrawerService.State());
  }
}

export namespace DrawerService {
  export class State {
    constructor(
      readonly visibleDrawer = Drawer._,
      readonly backdropVisibility = Visibility.HIDDEN
    ) {}
  }
}

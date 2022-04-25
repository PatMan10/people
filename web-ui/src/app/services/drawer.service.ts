import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {Drawer, Visibility} from "../app.utils";

@Injectable({
  providedIn: 'root',
})
export class DrawerService {
  private stateSub = new Subject<DrawerServiceState>();

  constructor() {
    this.stateSub.next(new DrawerServiceState());
  }

  get state(): Observable<DrawerServiceState> {
    return this.stateSub.asObservable();
  }

  open(drawer: Drawer): void {
    this.stateSub.next(new DrawerServiceState(drawer, Visibility.VISIBLE));
  }

  close(): void {
    this.stateSub.next(new DrawerServiceState());
  }
}

export class DrawerServiceState {
  constructor(
    readonly visibleDrawer = Drawer._,
    readonly backdropVisibility = Visibility.HIDDEN
  ) {}
}

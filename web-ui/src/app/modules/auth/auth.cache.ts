import { Injectable } from '@angular/core';

import { GetUserDto } from '../user/user.model';
import { clone } from '../common/models/generic.model';

@Injectable({
  providedIn: 'root',
})
export class AuthCache {
  private _user: GetUserDto | undefined;

  get user() {
    return clone(this._user);
  }

  set user(u: GetUserDto | undefined) {
    this._user = u;
    if (u) localStorage.setItem('user', JSON.stringify(u));
    if (u === undefined) localStorage.removeItem('user');
  }

  private constructor() {
    const u = localStorage.getItem('user');
    this._user = u ? JSON.parse(u) : undefined;
  }
}

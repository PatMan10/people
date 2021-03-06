import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

import { ApiUrls } from '../../utils/urls';
import { CreateUserDto, GetUserDto } from '../user/user.model';
import { AuthCache } from './auth.cache';
import { Credentials } from './auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthApi {
  constructor(
    private readonly http: HttpClient,
    private readonly cache: AuthCache
  ) {}

  register(user: CreateUserDto): Observable<GetUserDto> {
    return this.http
      .post<GetUserDto>(ApiUrls.auth.register(), user)
      .pipe(tap((payload) => (this.cache.user = payload)));
  }

  login(credentials: Credentials): Observable<GetUserDto> {
    return this.http
      .post<GetUserDto>(ApiUrls.auth.login(), credentials)
      .pipe(tap((payload) => (this.cache.user = payload)));
  }

  logout(): Observable<void> {
    return this.http
      .post<void>(ApiUrls.auth.logout(), undefined)
      .pipe(tap(() => (this.cache.user = undefined)));
  }
}

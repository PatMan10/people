import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

import { ApiUrls } from '../common/utils/urls';
import { CreateUserDto, GetUserDto } from '../user/user.model';
import { AuthCache } from './auth.cache';
import { Credentials } from './auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private readonly http: HttpClient,
    private readonly cache: AuthCache
  ) {}

  register(user: CreateUserDto): Observable<GetUserDto> {
    return this.http.post<GetUserDto>(ApiUrls.auth.register(), user, {
      headers: new HttpHeaders({ 'content-type': 'application/json' }),
      withCredentials: true,
    });
  }

  login(credentials: Credentials): Observable<GetUserDto> {
    return this.http
      .post<GetUserDto>(ApiUrls.auth.login(), credentials, {
        headers: new HttpHeaders({ 'content-type': 'application/json' }),
        withCredentials: true,
      })
      .pipe(tap((payload) => (this.cache.user = payload)));
  }

  logout(): Observable<void> {
    return this.http
      .post<void>(ApiUrls.auth.logout(), undefined, {
        headers: new HttpHeaders({ 'content-type': 'application/json' }),
        withCredentials: true,
      })
      .pipe(tap(() => (this.cache.user = undefined)));
  }
}

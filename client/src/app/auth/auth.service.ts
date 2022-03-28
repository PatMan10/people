import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap } from 'rxjs';

import { log, LogLevel, handleHttpError } from '../common/utils/rxjs';
import { ApiUrls } from '../common/utils/urls';
import { CreateUserDto, GetUserDto } from '../user/user.model';
import { Credentials } from './auth.model';
import { clone } from '../common/models/generic.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _user: GetUserDto | undefined;

  get user() {
    return clone(this._user);
  }

  constructor(private http: HttpClient) {}

  register(user: CreateUserDto): Observable<GetUserDto> {
    return this.http
      .post<GetUserDto>(ApiUrls.auth.register(), user, {
        headers: new HttpHeaders({ 'content-type': 'application/json' }),
      })
      .pipe(
        log(LogLevel.INFO, 'register user'),
        catchError(
          handleHttpError<GetUserDto>(`registerUser`, new GetUserDto())
        )
      );
  }

  login(credentials: Credentials): Observable<GetUserDto> {
    return this.http
      .post<GetUserDto>(ApiUrls.auth.login(), credentials, {
        headers: new HttpHeaders({ 'content-type': 'application/json' }),
      })
      .pipe(
        log(LogLevel.INFO, 'login user'),
        tap((payload) => (this._user = payload)),
        catchError(handleHttpError<GetUserDto>(`loginUser`, new GetUserDto()))
      );
  }

  logout(): Observable<void> {
    return this.http
      .post<void>(ApiUrls.auth.logout(), undefined, {
        headers: new HttpHeaders({ 'content-type': 'application/json' }),
      })
      .pipe(
        log(LogLevel.INFO, 'logout user'),
        tap(() => (this._user = undefined)),
        catchError(handleHttpError<void>(`logoutUser`, undefined))
      );
  }
}

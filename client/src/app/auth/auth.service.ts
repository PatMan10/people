import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap } from 'rxjs';

import { log, LogLevel } from '../common/utils/rxjs';
import { ErrorHandlingService } from '../common/services/error-handling.service';
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
    private readonly cache: AuthCache,
    private readonly erService: ErrorHandlingService
  ) {}

  register(user: CreateUserDto): Observable<GetUserDto> {
    return this.http
      .post<GetUserDto>(ApiUrls.auth.register(), user, {
        headers: new HttpHeaders({ 'content-type': 'application/json' }),
      })
      .pipe(
        log(LogLevel.INFO, 'register user'),
        catchError(this.erService.handleHttpError('register', new GetUserDto()))
      );
  }

  login(credentials: Credentials): Observable<GetUserDto> {
    return this.http
      .post<GetUserDto>(ApiUrls.auth.login(), credentials, {
        headers: new HttpHeaders({ 'content-type': 'application/json' }),
      })
      .pipe(
        log(LogLevel.INFO, 'login user'),
        tap((payload) => (this.cache.user = payload)),
        catchError(this.erService.handleHttpError('login', new GetUserDto()))
      );
  }

  logout(): Observable<void> {
    return this.http
      .post<void>(ApiUrls.auth.logout(), undefined, {
        headers: new HttpHeaders({ 'content-type': 'application/json' }),
      })
      .pipe(
        log(LogLevel.INFO, 'logout user'),
        tap(() => (this.cache.user = undefined)),
        catchError(this.erService.handleHttpError(`logout`, undefined))
      );
  }
}

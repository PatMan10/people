import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';

import { ErrorHandlingService } from '../common/services/error-handling.service';
import { log, LogLevel } from '../common/utils/rxjs';
import { ApiUrls } from '../common/utils/urls';
import { GetUserDto, UpdateUserDto } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private readonly http: HttpClient,
    private readonly erService: ErrorHandlingService
  ) {}

  getById(id: string): Observable<GetUserDto> {
    return this.http
      .get<GetUserDto>(ApiUrls.user.getById(id))
      .pipe(
        log(LogLevel.INFO, 'get user'),
        catchError(this.erService.handleHttpError('get user', new GetUserDto()))
      );
  }

  update(id: string, user: UpdateUserDto): Observable<GetUserDto> {
    return this.http
      .put<GetUserDto>(ApiUrls.user.update(id), user, {
        headers: new HttpHeaders({ 'content-type': 'application/json' }),
      })
      .pipe(
        log(LogLevel.INFO, 'update user'),
        catchError(
          this.erService.handleHttpError('update user', new GetUserDto())
        )
      );
  }

  delete(id: string): Observable<GetUserDto> {
    return this.http
      .delete<GetUserDto>(ApiUrls.user.getById(id))
      .pipe(
        log(LogLevel.INFO, 'delete user'),
        catchError(
          this.erService.handleHttpError('delete user', new GetUserDto())
        )
      );
  }
}

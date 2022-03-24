import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';

import { log, LogLevel, handleHttpError } from '../common/utils/rxjs';
import { ApiUrls } from '../common/utils/urls';
import { GetUserDto, UpdateUserDto } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getById(id: string): Observable<GetUserDto> {
    return this.http
      .get<GetUserDto>(ApiUrls.user.getById(id))
      .pipe(
        log(LogLevel.INFO, 'get user'),
        catchError(
          handleHttpError<GetUserDto>(`getUser id=${id}`, new GetUserDto())
        )
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
          handleHttpError<GetUserDto>(`updateUser id=${id}`, new GetUserDto())
        )
      );
  }

  delete(id: string): Observable<GetUserDto> {
    return this.http
      .delete<GetUserDto>(ApiUrls.user.getById(id))
      .pipe(
        log(LogLevel.INFO, 'delete user'),
        catchError(
          handleHttpError<GetUserDto>(`deleteUser id=${id}`, new GetUserDto())
        )
      );
  }
}

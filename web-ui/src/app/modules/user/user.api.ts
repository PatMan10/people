import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

import { ApiUrls } from 'src/app/utils/urls';
import { GetUserDto, UpdateUserDto } from 'src/app/modules/user/user.model';
import { AuthCache } from 'src/app/modules/auth/auth.cache';

@Injectable({
  providedIn: 'root',
})
export class UserApi {
  constructor(
    private readonly http: HttpClient,
    private readonly cache: AuthCache
  ) {}

  getById(id: string): Observable<GetUserDto> {
    return this.http.get<GetUserDto>(ApiUrls.user.getById(id));
  }

  update(id: string, user: UpdateUserDto): Observable<GetUserDto> {
    return this.http
      .put<GetUserDto>(ApiUrls.user.update(id), user)
      .pipe(tap((payload) => (this.cache.user = payload)));
  }

  delete(id: string): Observable<GetUserDto> {
    return this.http
      .delete<GetUserDto>(ApiUrls.user.getById(id))
      .pipe(tap(() => (this.cache.user = undefined)));
  }
}

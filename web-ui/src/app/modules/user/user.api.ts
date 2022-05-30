import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiUrls } from '../shared/utils/urls';
import { GetUserDto, UpdateUserDto } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class UserApi {
  constructor(private readonly http: HttpClient) {}

  getById(id: string): Observable<GetUserDto> {
    return this.http.get<GetUserDto>(ApiUrls.user.getById(id));
  }

  update(id: string, user: UpdateUserDto): Observable<GetUserDto> {
    return this.http.put<GetUserDto>(ApiUrls.user.update(id), user);
  }

  delete(id: string): Observable<GetUserDto> {
    return this.http.delete<GetUserDto>(ApiUrls.user.getById(id));
  }
}

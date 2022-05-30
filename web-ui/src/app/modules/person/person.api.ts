import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { ApiUrls } from '../shared/utils/urls';
import { Person } from './person.model';
import logger from '../shared/utils/logger';

@Injectable({
  providedIn: 'root',
})
export class PersonApi {
  constructor(private readonly http: HttpClient) {}

  getByQuery(): Observable<Person[]> {
    return this.http.get<Person[]>(ApiUrls.person.getAll()).pipe(
      tap((res) => {
        logger.debug('getByQuery', res);
      })
    );
  }

  getById(id: string): Observable<Person> {
    return this.http
      .get<Person>(ApiUrls.person.getById(id))
      .pipe(tap((res) => logger.debug('getById', res)));
  }

  save(person: Person): Observable<Person> {
    const { _id } = person;
    const $ = _id
      ? this.http.put<Person>(ApiUrls.person.update(_id), person)
      : this.http.post<Person>(ApiUrls.person.add(), person);

    return $.pipe(tap((res) => logger.debug('save', res)));
  }

  delete(id: string): Observable<Person> {
    return this.http
      .delete<Person>(ApiUrls.person.getById(id))
      .pipe(tap((res) => logger.debug('delete', res)));
  }
}

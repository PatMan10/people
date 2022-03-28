import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';

import { handleHttpError } from '../common/utils/rxjs';
import { log, LogLevel } from '../common/utils/rxjs';
import { ApiUrls } from '../common/utils/urls';
import { Person } from './person.model';

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Person[]> {
    return this.http
      .get<Person[]>(ApiUrls.person.getAll())
      .pipe(
        log(LogLevel.INFO, 'get people'),
        catchError(handleHttpError<Person[]>('getPeople', []))
      );
  }

  getById(id: string): Observable<Person> {
    return this.http
      .get<Person>(ApiUrls.person.getById(id))
      .pipe(
        log(LogLevel.INFO, 'get person'),
        catchError(handleHttpError<Person>(`getPerson id=${id}`, new Person()))
      );
  }

  add(person: Person): Observable<Person> {
    return this.http
      .post<Person>(ApiUrls.person.add(), person, {
        headers: new HttpHeaders({ 'content-type': 'application/json' }),
      })
      .pipe(
        log(LogLevel.INFO, 'add person'),
        catchError(handleHttpError<Person>(`addPerson`, new Person()))
      );
  }

  update(id: string, person: Person): Observable<Person> {
    return this.http
      .put<Person>(ApiUrls.person.update(id), person, {
        headers: new HttpHeaders({ 'content-type': 'application/json' }),
      })
      .pipe(
        log(LogLevel.INFO, 'update person'),
        catchError(
          handleHttpError<Person>(`updatePerson id=${id}`, new Person())
        )
      );
  }

  delete(id: string): Observable<Person> {
    return this.http
      .delete<Person>(ApiUrls.person.getById(id))
      .pipe(
        log(LogLevel.INFO, 'delete person'),
        catchError(
          handleHttpError<Person>(`deletePerson id=${id}`, new Person())
        )
      );
  }
}

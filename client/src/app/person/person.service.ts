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
      .get<Person[]>(ApiUrls.people.getAll())
      .pipe(
        log(LogLevel.INFO, 'fetched people'),
        catchError(handleHttpError<Person[]>('fetchPeople', []))
      );
  }

  getById(id: string): Observable<Person> {
    return this.http
      .get<Person>(ApiUrls.people.getById(id))
      .pipe(
        log(LogLevel.INFO, 'fetched person'),
        catchError(
          handleHttpError<Person>(`fetchPerson id=${id}`, new Person())
        )
      );
  }

  add(person: Person): Observable<Person> {
    return this.http
      .post<Person>(ApiUrls.people.add(), person, {
        headers: new HttpHeaders({ 'content-type': 'application/json' }),
      })
      .pipe(
        log(LogLevel.INFO, 'add person'),
        catchError(handleHttpError<Person>(`addPerson`, new Person()))
      );
  }

  update(person: Person): Observable<Person> {
    return this.http
      .put<Person>(ApiUrls.people.update(person._id), person, {
        headers: new HttpHeaders({ 'content-type': 'application/json' }),
      })
      .pipe(
        log(LogLevel.INFO, 'update person'),
        catchError(
          handleHttpError<Person>(`savePerson id=${person._id}`, new Person())
        )
      );
  }

  delete(id: string): Observable<Person> {
    return this.http
      .delete<Person>(ApiUrls.people.getById(id))
      .pipe(
        log(LogLevel.INFO, 'delete person'),
        catchError(
          handleHttpError<Person>(`deletePerson id=${id}`, new Person())
        )
      );
  }
}

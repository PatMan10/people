import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';

import { handleError } from '../utils/rxjs';
import { log, LogLevel } from '../utils/rxjs';
import { ApiUrls } from '../utils/urls';
import { Person } from '../models/person.model';

@Injectable({
  providedIn: 'root',
})
export class PeopleService {
  constructor(private http: HttpClient) {}

  getAll = (): Observable<Person[]> =>
    this.http
      .get<Person[]>(ApiUrls.people.getAll())
      .pipe(
        log(LogLevel.INFO, 'fetched people'),
        catchError(handleError<Person[]>('fetchPeople', []))
      );

  getById = (id: string): Observable<Person | undefined> =>
    this.http
      .get<Person>(ApiUrls.people.getById(id))
      .pipe(
        log(LogLevel.INFO, 'fetched person'),
        catchError(
          handleError<Person | undefined>(`fetchPerson id=${id}`, undefined)
        )
      );

  add = (person: Person): Observable<Person> =>
    this.http
      .post<Person>(ApiUrls.people.add(), person, {
        headers: new HttpHeaders({ 'content-type': 'application/json' }),
      })
      .pipe(
        log(LogLevel.INFO, 'add person'),
        catchError(handleError<Person>(`addPerson`, new Person()))
      );

  save = (person: Person): Observable<Person> =>
    this.http
      .put<Person>(ApiUrls.people.update(person.id as string), person, {
        headers: new HttpHeaders({ 'content-type': 'application/json' }),
      })
      .pipe(
        log(LogLevel.INFO, 'save person'),
        catchError(
          handleError<Person>(`savePerson id=${person.id}`, new Person())
        )
      );

  delete = (id: string): Observable<Person | undefined> =>
    this.http
      .delete<Person>(ApiUrls.people.getById(id))
      .pipe(
        log(LogLevel.INFO, 'delete person'),
        catchError(
          handleError<Person | undefined>(`deletePerson id=${id}`, undefined)
        )
      );
}

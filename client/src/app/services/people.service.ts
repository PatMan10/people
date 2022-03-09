import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';

import { handleError } from '../utils/rxjs';
import { log, LogLevel } from '../utils/rxjs';
import { ApiUrls } from '../utils/urls';
import { Person } from '../models/person.model';
import { Body } from '../models/http.model';

@Injectable({
  providedIn: 'root',
})
export class PeopleService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Person[]> {
    return this.http.get<Body<Person[]>>(ApiUrls.people.getAll()).pipe(
      map((body) => body.payload as Person[]),
      log(LogLevel.INFO, 'fetched people'),
      catchError(handleError<Person[]>('fetchPeople', []))
    );
  }

  getById(id: string): Observable<Person> {
    return this.http.get<Body<Person>>(ApiUrls.people.getById(id)).pipe(
      map((body) => body.payload as Person),
      log(LogLevel.INFO, 'fetched person'),
      catchError(handleError<Person>(`fetchPerson id=${id}`, new Person()))
    );
  }

  add(person: Person): Observable<Person> {
    return this.http
      .post<Body<Person>>(ApiUrls.people.add(), person, {
        headers: new HttpHeaders({ 'content-type': 'application/json' }),
      })
      .pipe(
        map((body) => body.payload as Person),
        log(LogLevel.INFO, 'add person'),
        catchError(handleError<Person>(`addPerson`, new Person()))
      );
  }

  save(person: Person): Observable<Person> {
    return this.http
      .put<Body<Person>>(ApiUrls.people.update(person._id), person, {
        headers: new HttpHeaders({ 'content-type': 'application/json' }),
      })
      .pipe(
        map((body) => body.payload as Person),
        log(LogLevel.INFO, 'save person'),
        catchError(
          handleError<Person>(`savePerson id=${person._id}`, new Person())
        )
      );
  }

  delete(id: string): Observable<Person> {
    return this.http.delete<Body<Person>>(ApiUrls.people.getById(id)).pipe(
      map((body) => body.payload as Person),
      log(LogLevel.INFO, 'delete person'),
      catchError(handleError<Person>(`deletePerson id=${id}`, new Person()))
    );
  }
}

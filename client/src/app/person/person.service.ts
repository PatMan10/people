import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';

import { log, LogLevel } from '../common/utils/rxjs';
import { ErrorHandlingService } from '../common/services/error-handling.service';
import { ApiUrls } from '../common/utils/urls';
import { Person } from './person.model';

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  constructor(
    private readonly http: HttpClient,
    private readonly erService: ErrorHandlingService
  ) {}

  getAll(): Observable<Person[]> {
    return this.http
      .get<Person[]>(ApiUrls.person.getAll())
      .pipe(
        log(LogLevel.INFO, 'get people'),
        catchError(this.erService.handleHttpError('get people', []))
      );
  }

  getById(id: string): Observable<Person> {
    return this.http
      .get<Person>(ApiUrls.person.getById(id))
      .pipe(
        log(LogLevel.INFO, 'get person'),
        catchError(this.erService.handleHttpError('get person', new Person()))
      );
  }

  add(person: Person): Observable<Person> {
    return this.http
      .post<Person>(ApiUrls.person.add(), person, {
        headers: new HttpHeaders({ 'content-type': 'application/json' }),
      })
      .pipe(
        log(LogLevel.INFO, 'add person'),
        catchError(this.erService.handleHttpError('add person', new Person()))
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
          this.erService.handleHttpError('update person', new Person())
        )
      );
  }

  delete(id: string): Observable<Person> {
    return this.http
      .delete<Person>(ApiUrls.person.getById(id))
      .pipe(
        log(LogLevel.INFO, 'delete person'),
        catchError(
          this.erService.handleHttpError('delete person', new Person())
        )
      );
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap, catchError } from 'rxjs';
import { logger } from '../utils/logger';
import { ApiUrls } from '../utils/urls';
import {Person} from "../models/person.model";

@Injectable({
  providedIn: 'root',
})
export class PeopleService {
  constructor(private http: HttpClient) {}

  getAll = (): Observable<Person[]> =>
    this.http.get<Person[]>(ApiUrls.people.getAll()).pipe(
      tap((hs) => {
        logger.info('fetched people');
        logger.info(`tap into PeopleService.getAll => `, hs);
      }),
      catchError(handleError<Person[]>('getPersones', []))
    );

  getById = (id: string): Observable<Person | undefined> =>
    this.http.get<Person>(ApiUrls.people.getById(id)).pipe(
      tap((h) => {
        logger.info(`fetched person id=${id}`);
        logger.info(`tap into PeopleService.getById => `, h);
      }),
      catchError(
        handleError<Person | undefined>(`getPerson id=${id}`, undefined)
      )
    );

  add = (person: Person): Observable<Person> =>
    this.http
      .post<Person>(ApiUrls.people.add(), person, {
        headers: new HttpHeaders({ 'content-type': 'application/json' }),
      })
      .pipe(
        tap((h) => {
          logger.info(`added person id=${person.id}`);
          logger.info(`tap into PeopleService.add => `, h);
        }),
        catchError(
          handleError<Person>(`addPerson id=${person.id}`, new Person())
        )
      );

  update = (person: Person): Observable<Person> =>
    this.http
      .put<Person>(ApiUrls.people.update(person.id as string), person, {
        headers: new HttpHeaders({ 'content-type': 'application/json' }),
      })
      .pipe(
        tap((h) => {
          logger.info(`saved person id=${person.id}`);
          logger.info(`tap into PeopleService.save => `, h);
        }),
        catchError(
          handleError<Person>(`savePerson id=${person.id}`, new Person())
        )
      );

  delete = (id: string): Observable<Person | undefined> =>
    this.http.delete<Person>(ApiUrls.people.getById(id)).pipe(
      tap((h) => {
        logger.info(`deleted person id=${id}`);
        logger.info(`tap into PeopleService.deleteById => `, h);
      }),
      catchError(
        handleError<Person | undefined>(`deletePerson id=${id}`, undefined)
      )
    );
}

/**
 * Handle Http operation that failed.
 * Let the app continue.
 *
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
const handleError =
  <T>(operation: string, result: T) =>
  (err: Error): Observable<T> => {
    // TODO: send the error to remote logging infrastructure
    console.error(`error => `, err); // log to console instead

    // TODO: better job of transforming error for user consumption
    logger.info(`${operation} failed: ${err.message}`);

    // Let the app keep running by returning an empty result.
    return of(result);
  };

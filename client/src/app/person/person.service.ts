import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';

import { ApiUrls } from '../common/utils/urls';
import { Person } from './person.model';

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Person[]> {
    return this.http.get<Person[]>(ApiUrls.people.getAll());
  }

  getById(id: string): Observable<Person> {
    return this.http.get<Person>(ApiUrls.people.getById(id));
  }

  add(person: Person): Observable<Person> {
    return this.http.post<Person>(ApiUrls.people.add(), person, {
      headers: new HttpHeaders({ 'content-type': 'application/json' }),
    });
  }

  update(person: Person): Observable<Person> {
    return this.http.put<Person>(ApiUrls.people.update(person._id), person, {
      headers: new HttpHeaders({ 'content-type': 'application/json' }),
    });
  }

  delete(id: string): Observable<Person> {
    return this.http.delete<Person>(ApiUrls.people.getById(id));
  }
}

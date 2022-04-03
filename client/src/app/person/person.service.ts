import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiUrls } from '../common/utils/urls';
import { Person } from './person.model';

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  constructor(private readonly http: HttpClient) {}

  getAll(): Observable<Person[]> {
    return this.http.get<Person[]>(ApiUrls.person.getAll());
  }

  getById(id: string): Observable<Person> {
    return this.http.get<Person>(ApiUrls.person.getById(id));
  }

  add(person: Person): Observable<Person> {
    return this.http.post<Person>(ApiUrls.person.add(), person, {
      headers: new HttpHeaders({ 'content-type': 'application/json' }),
    });
  }

  update(id: string, person: Person): Observable<Person> {
    return this.http.put<Person>(ApiUrls.person.update(id), person, {
      headers: new HttpHeaders({ 'content-type': 'application/json' }),
    });
  }

  delete(id: string): Observable<Person> {
    return this.http.delete<Person>(ApiUrls.person.getById(id));
  }
}

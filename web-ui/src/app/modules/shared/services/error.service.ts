import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

// import { ModalService } from '../modals/modal.service';
// import { InfoModalData } from '../modals/info/info.modal';
import { ErrorDto } from '../models/http.model';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  constructor(/*private readonly modalService: ModalService*/) {}

  //####################
  // ERROR HANDLING OPERATOR
  //####################

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  handleHttpError<T>(
    operation: string,
    result: T
  ): (e: HttpErrorResponse) => Observable<T> {
    return (httpErr: HttpErrorResponse): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(httpErr); // log to console instead

      const { message } = httpErr.error as ErrorDto;
      /*this.modalService.info(
        new InfoModalData('error', `${operation} failed`, [message])
      );*/

      // Let the app keep running by returning an empty result.
      return of(result);
    };
  }
}

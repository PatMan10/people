import { HttpErrorResponse } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { Body, Error } from '../models/http.model';
import { Logger } from './logger';

//####################
// LOG OPERATOR
//####################

export class LogLevel {
  static readonly ERROR = new LogLevel('error', 3);
  static readonly WARN = new LogLevel('warn', 2);
  static readonly INFO = new LogLevel('info', 1);
  static readonly DEBUG = new LogLevel('debug', 0);

  private constructor(readonly name: string, readonly value: number) {}
}

let logLevel = LogLevel.INFO;
export const setLogLevel = (level: LogLevel) => {
  logLevel = level;
};

/**
 * Log during the observable pipe chain.
 *
 * @param level - level of the log operation
 * @param message - message to log
 */
export function log<T>(
  level: LogLevel,
  message: string = ''
): (v: Observable<T>) => Observable<T> {
  return (source: Observable<T>) =>
    source.pipe(
      tap((val) => {
        if (level.value >= logLevel.value) {
          const logFun =
            level.name === LogLevel.ERROR.name
              ? Logger.error
              : level.name === LogLevel.WARN.name
              ? Logger.warn
              : level.name === LogLevel.INFO.name
              ? Logger.info
              : Logger.debug;
          logFun(`${level.name}: ${message}`, val);
        }
      })
    );
}

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
export function handleHttpError<T>(
  operation: string,
  result: T
): (e: HttpErrorResponse) => Observable<T> {
  return (httpErr: HttpErrorResponse): Observable<T> => {
    // TODO: send the error to remote logging infrastructure
    console.error(httpErr); // log to console instead

    const err = (httpErr.error as Body<undefined>).error as Error;
    // TODO: better job of transforming error for user consumption
    Logger.info(`${operation} failed: ${err.message}`);
    alert(err.message);

    // Let the app keep running by returning an empty result.
    return of(result);
  };
}

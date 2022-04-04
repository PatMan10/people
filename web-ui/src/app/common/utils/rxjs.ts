import { Observable, tap } from 'rxjs';

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
              ? console.error
              : level.name === LogLevel.WARN.name
              ? console.warn
              : level.name === LogLevel.INFO.name
              ? console.info
              : console.info;
          logFun(`${level.name}: ${message}`, val);
        }
      })
    );
}

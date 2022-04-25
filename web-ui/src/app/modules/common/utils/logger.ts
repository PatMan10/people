export enum LogLevel {
  ERROR = 0,
  WARN = 1,
  INFO = 2,
  DEBUG = 3,
  VERBOSE = 4,
}

export class Logger {
  level = LogLevel.VERBOSE;

  error(...data: any[]) {
    if (this.level >= LogLevel.ERROR)
      console.log('%c error:', 'color: red;', ...data);
  }

  warn(...data: any[]) {
    if (this.level >= LogLevel.WARN)
      console.log('%c warn:', 'color: orange;', ...data);
  }

  info(...data: any[]) {
    if (this.level >= LogLevel.INFO)
      console.log('%c info:', 'color: green;', ...data);
  }

  debug(...data: any[]) {
    if (this.level >= LogLevel.DEBUG)
      console.log('%c debug:', 'color: blue;', ...data);
  }

  verbose(...data: any[]) {
    if (this.level >= LogLevel.VERBOSE)
      console.log('%c verbose:', 'color: black;', ...data);
  }
}
const logger = new Logger();
export default logger;

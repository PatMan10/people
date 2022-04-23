export enum LogLevel {
  ERROR = 0,
  WARN = 1,
  INFO = 2,
  DEBUG = 3,
}

export class Logger {
  level = LogLevel.DEBUG;

  error(...data: any[]) {
    if (this.level >= LogLevel.ERROR) console.error('error:', ...data);
  }

  warn(...data: any[]) {
    if (this.level >= LogLevel.WARN) console.warn('warn:', ...data);
  }

  info(...data: any[]) {
    if (this.level >= LogLevel.INFO) console.info('info:', ...data);
  }

  debug(...data: any[]) {
    if (this.level >= LogLevel.DEBUG) console.log('debug:', ...data);
  }
}
const logger = new Logger;
export default logger;

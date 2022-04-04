import { LoggerService } from '@nestjs/common';
import config, { LogLevel } from '../../app/app.config';

export class Logger implements LoggerService {
  constructor(public level: LogLevel = config.LOG_LEVEL) {}

  error(...data: any[]) {
    if (this.level >= LogLevel.ERROR)
      console.log('\x1b[31m', 'error:', '\x1b[0m', ...data);
  }

  warn(...data: any[]) {
    if (this.level >= LogLevel.WARN)
      console.log('\x1b[33m', 'warn:', '\x1b[0m', ...data);
  }

  log(...data: any[]) {
    if (this.level >= LogLevel.INFO)
      console.log('\x1b[32m', 'info:', '\x1b[0m', ...data);
  }

  debug(...data: any[]) {
    if (this.level >= LogLevel.DEBUG)
      console.log('\x1b[34m', 'debug:', '\x1b[0m', ...data);
  }

  verbose(...data: any[]) {
    if (this.level >= LogLevel.VERBOSE)
      console.log('\x1b[37m', 'verbose:', '\x1b[0m', ...data);
  }
}

const logger = new Logger();
export default logger;

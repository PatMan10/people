export class Logger {
  constructor(public level: Logger.Level = Logger.Level.VERBOSE) {}

  error(...data: any[]) {
    if (this.level >= Logger.Level.ERROR)
      console.log("\x1b[31m", "error:", "\x1b[0m", ...data);
  }

  warn(...data: any[]) {
    if (this.level >= Logger.Level.WARN)
      console.log("\x1b[33m", "warn:", "\x1b[0m", ...data);
  }

  info(...data: any[]) {
    if (this.level >= Logger.Level.INFO)
      console.log("\x1b[32m", "info:", "\x1b[0m", ...data);
  }

  debug(...data: any[]) {
    if (this.level >= Logger.Level.DEBUG)
      console.log("\x1b[34m", "debug:", "\x1b[0m", ...data);
  }

  verbose(...data: any[]) {
    if (this.level >= Logger.Level.VERBOSE)
      console.log("\x1b[37m", "verbose:", "\x1b[0m", ...data);
  }
}

export namespace Logger {
  export enum Level {
    ERROR = 0,
    WARN = 1,
    INFO = 2,
    DEBUG = 3,
    VERBOSE = 4,
  }
}

const logger = new Logger();
export default logger;

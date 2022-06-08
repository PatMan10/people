export enum LogLevel {
  None = 0,
  Error = 1,
  Warn = 2,
  Info = 3,
  Debug = 4,
  Verbose = 5,
}

export class Logger {
  constructor(public context: string, public level: LogLevel){}

  private get ctx(){
    return this.context ? `${this.context} ` : '';
  }

  error(...data: any[]) {
    if (this.level >= LogLevel.Error)
      console.log(`%c${this.ctx}error:`, 'color: red;', ...data);
  }

  warn(...data: any[]) {
    if (this.level >= LogLevel.Warn)
      console.log(`%c${this.ctx}warn:`, 'color: orange;', ...data);
  }

  info(...data: any[]) {
    if (this.level >= LogLevel.Info)
      console.log(`%c${this.ctx}info:`, 'color: green;', ...data);
  }

  debug(...data: any[]) {
    if (this.level >= LogLevel.Debug)
      console.log(`%c${this.ctx}debug:`, 'color: blue;', ...data);
  }

  verbose(...data: any[]) {
    if (this.level >= LogLevel.Verbose)
      console.log(`%c${this.ctx}verbose:`, 'color: black;', ...data);
  }
}

const logger = new Logger('App', LogLevel.Debug);
export default logger;

export class Logger {
  static readonly info = (...data: unknown[]) => console.info(...data);
  static readonly warn = (...data: unknown[]) => console.warn(...data);
  static readonly error = (...data: unknown[]) => console.error(...data);
  static readonly debug = (...data: unknown[]) => console.log(...data);
}

class Logger {
  info(...data: unknown[]) {
    console.info(...data);
  }
  warn(...data: unknown[]) {
    console.warn(...data);
  }
  error(...data: unknown[]) {
    console.error(...data);
  }
}
export const logger = new Logger();

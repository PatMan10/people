// urls
enum URLPlaceholder {
  ID = ":id",
}

export class Urls {
  static readonly ROOT = "http://localhost:8000";
  static readonly INDEX = "/";
  static readonly WILD = "*";

  static readonly people = class {
    static readonly GET_ALL = "/people";
    static readonly GET_BY_ID = `/people/${URLPlaceholder.ID}`;
    static readonly ADD = `/people`;
    static readonly SAVE = `/people/${URLPlaceholder.ID}`;
    static readonly DELETE = `/people/${URLPlaceholder.ID}`;

    static getAll = () => this.GET_ALL;
    static getById = (id: string) =>
      this.GET_BY_ID.replace(URLPlaceholder.ID, id.toString());
    static add = () => this.ADD;
    static save = (id: string) =>
      this.SAVE.replace(URLPlaceholder.ID, id.toString());
    static delete = (id: string) =>
      this.DELETE.replace(URLPlaceholder.ID, id.toString());
  };
}

export class Messages {
  static readonly success = class {
    static readonly WELCOME = "Welcome to he people API.";
  };

  static readonly fail = class {
    static readonly INTERNAL_SERVER_ERROR =
      "Uh oh, some unexpected error ocurred...";

    static readonly INVALID_ID = "Invalid id.";
    static readonly NOT_FOUND = "Resource not found.";
  };
}

// logger
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

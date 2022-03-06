// urls
enum UrlParam {
  ID = ":id",
}

export class Urls {
  static readonly ROOT = "http://localhost:8000";
  static readonly INDEX = "/";
  static readonly WILD = "*";

  static readonly people = class {
    static readonly GET_ALL = `/people`;
    static readonly GET_BY_ID = `/people/${UrlParam.ID}`;
    static readonly ADD = `/people`;
    static readonly UPDATE = `/people/${UrlParam.ID}`;
    static readonly DELETE = `/people/${UrlParam.ID}`;

    static getAll = () => this.GET_ALL;
    static getById = (_id: string) =>
      this.GET_BY_ID.replace(UrlParam.ID, _id.toString());
    static add = () => this.ADD;
    static update = (_id: string) =>
      this.UPDATE.replace(UrlParam.ID, _id.toString());
    static delete = (_id: string) =>
      this.DELETE.replace(UrlParam.ID, _id.toString());
  };
}

// responses
export class Messages {
  static readonly success = class {
    static readonly WELCOME = "Welcome to the people API.";
  };

  static readonly fail = class {
    static readonly INTERNAL_SERVER_ERROR =
      "Uh oh, some unexpected error ocurred...";

    static readonly INVALID_ID = "Invalid id.";
    static readonly INVALID_DATA = "Invalid data.";
    static readonly NOT_FOUND = "Resource not found.";
  };
}


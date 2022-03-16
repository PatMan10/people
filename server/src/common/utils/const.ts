// urls
enum Param {
  ID = ':id',
}

export class Urls {
  static readonly ROOT = 'http://localhost:8000';
  static readonly INDEX = '/';
  static readonly WILD = '*';

  static readonly person = class {
    static readonly GET_ALL = `/people`;
    static readonly GET_BY_ID = `/people/${Param.ID}`;
    static readonly ADD = `/people`;
    static readonly UPDATE = `/people/${Param.ID}`;
    static readonly DELETE = `/people/${Param.ID}`;

    static getAll = () => this.GET_ALL;
    static getById = (id: string) =>
      this.GET_BY_ID.replace(Param.ID, id.toString());
    static add = () => this.ADD;
    static update = (id: string) =>
      this.UPDATE.replace(Param.ID, id.toString());
    static delete = (id: string) =>
      this.DELETE.replace(Param.ID, id.toString());
  };
}

// responses
export class Messages {
  static readonly success = class {
    static readonly WELCOME = 'Welcome to the people rest API.';
  };

  static readonly fail = class {
    static readonly INTERNAL_SERVER_ERROR =
      'Uh oh, some unexpected error ocurred...';

    static readonly INVALID_ID = 'Invalid id.';
    static readonly INVALID_PAYLOAD = 'Invalid payload.';
    static readonly INVALID_QUERY = 'Invalid query.';
    static readonly NOT_FOUND = 'Resource not found.';
    static readonly NO_PAYLOAD = 'Payload is undefined.';
    static readonly NO_QUERY = 'Query is undefined.';
  };
}

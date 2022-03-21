// urls
enum Param {
  ID = ':id',
}

export class Urls {
  static readonly ROOT = 'http://localhost:8000';
  static readonly INDEX = '/';
  static readonly WILD = '*';

  static readonly auth = class {
    static readonly REGISTER = `/auth/register`;
    static readonly LOGIN = `/auth/login`;
    static readonly LOGOUT = `/auth/logout`;
    static readonly WHO_AM_I = `/auth/whoami`;
  };

  static readonly user = class {
    static readonly GET_BY_ID = `/users/${Param.ID}`;
    static readonly UPDATE = `/users/${Param.ID}`;
    static readonly DELETE = `/users/${Param.ID}`;

    static getById = (id: string) => this.GET_BY_ID.replace(Param.ID, id);
    static update = (id: string) => this.UPDATE.replace(Param.ID, id);
    static delete = (id: string) => this.DELETE.replace(Param.ID, id);
  };

  static readonly person = class {
    static readonly GET_ALL = `/people`;
    static readonly GET_BY_ID = `/people/${Param.ID}`;
    static readonly ADD = `/people`;
    static readonly UPDATE = `/people/${Param.ID}`;
    static readonly DELETE = `/people/${Param.ID}`;

    static getAll = () => this.GET_ALL;
    static getById = (id: string) => this.GET_BY_ID.replace(Param.ID, id);
    static add = () => this.ADD;
    static update = (id: string) => this.UPDATE.replace(Param.ID, id);
    static delete = (id: string) => this.DELETE.replace(Param.ID, id);
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

    static readonly auth = class {
      static readonly DUPLICATE_HANDLE =
        'User already exists with that handle.';
      static readonly DUPLICATE_EMAIL = 'User already exists with that email.';
      static readonly INVALID_CREDENTIALS = 'Invalid email or password.';
    };
  };
}

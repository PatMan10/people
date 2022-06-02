import { EntityQuery } from '../models/generic.model';

enum Param {
  ID = ':id',
}

export class UiUrls {
  static readonly auth = class {
    static readonly REGISTER = `auth/register`;
    static readonly LOGIN = `auth/login`;
    static readonly LOGOUT = `auth/logout`;
    static readonly WHO_AM_I = `auth/whoami`;
  };

  static readonly user = class {
    static readonly VIEW_BY_ID = `users/${Param.ID}`;
    static readonly EDIT = `users/${Param.ID}`;
    static readonly DELETE = `users/${Param.ID}`;

    static getById = (id: string) => this.VIEW_BY_ID.replace(Param.ID, id);
    static edit = (id: string) => this.EDIT.replace(Param.ID, id);
    static delete = (id: string) => this.DELETE.replace(Param.ID, id);
  };

  static readonly person = class {
    static readonly VIEW_BY_QUERY = 'people';
    static readonly VIEW_BY_ID = `people/${Param.ID}`;
    static readonly ADD = 'add-person';
    static readonly EDIT = `edit-person/${Param.ID}`;
    static readonly DELETE = `delete-person/${Param.ID}`;

    static viewByQuery = () => `/${this.VIEW_BY_QUERY}`;
    static viewById = (id: string) =>
      `/${this.VIEW_BY_ID}`.replace(Param.ID, id);
    static add = () => `/${this.ADD}`;
    static edit = (id: string) => `/${this.EDIT}`.replace(Param.ID, id);
    static delete = (id: string) => `/${this.DELETE}`.replace(Param.ID, id);
  };
}

export class ApiUrls {
  static readonly ROOT = 'http://localhost:8000';
  static readonly INDEX = '/';

  static readonly auth = class {
    static readonly REGISTER = `/auth/register`;
    static readonly LOGIN = `/auth/login`;
    static readonly LOGOUT = `/auth/logout`;
    static readonly WHO_AM_I = `/auth/whoami`;

    static register = () => ApiUrls.ROOT + this.REGISTER;
    static login = () => ApiUrls.ROOT + this.LOGIN;
    static logout = () => ApiUrls.ROOT + this.LOGOUT;
    static whoami = () => ApiUrls.ROOT + this.WHO_AM_I;
  };

  static readonly user = class {
    static readonly GET_BY_ID = `/users/${Param.ID}`;
    static readonly UPDATE = `/users/${Param.ID}`;
    static readonly DELETE = `/users/${Param.ID}`;

    static getById = (id: string) =>
      ApiUrls.ROOT + this.GET_BY_ID.replace(Param.ID, id);
    static update = (id: string) =>
      ApiUrls.ROOT + this.UPDATE.replace(Param.ID, id);
    static delete = (id: string) =>
      ApiUrls.ROOT + this.DELETE.replace(Param.ID, id);
  };

  static readonly person = class {
    static readonly GET_BY_QUERY = `/people`;
    static readonly GET_BY_ID = `/people/${Param.ID}`;
    static readonly ADD = `/people`;
    static readonly UPDATE = `/people/${Param.ID}`;
    static readonly DELETE = `/people/${Param.ID}`;

    static getByQuery = (q: EntityQuery) =>
      ApiUrls.ROOT + this.GET_BY_QUERY + `?q=${JSON.stringify(q)}`;
    static getById = (id: string) =>
      ApiUrls.ROOT + this.GET_BY_ID.replace(Param.ID, id);
    static add = () => ApiUrls.ROOT + this.ADD;
    static update = (id: string) =>
      ApiUrls.ROOT + this.UPDATE.replace(Param.ID, id);
    static delete = (id: string) =>
      ApiUrls.ROOT + this.DELETE.replace(Param.ID, id);
  };
}

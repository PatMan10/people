import { EntityQuery } from '../modules/shared/models/generic.model';

enum Param {
  ID = ':id',
}

export class UiUrls {
  static readonly INDEX = '';

  static readonly index = () => '/';

  static readonly auth = class {
    static readonly REGISTER = `auth/register`;
    static readonly LOGIN = `auth/login`;
    static readonly LOGOUT = `auth/logout`;
    static readonly WHO_AM_I = `auth/whoami`;

    static readonly register = () => `/${this.REGISTER}`;
    static readonly login = () => `/${this.LOGIN}`;
    static readonly logout = () => `/${this.LOGOUT}`;
    static readonly whoAmI = () => `/${this.WHO_AM_I}`;
  };

  static readonly user = class {
    static readonly DETAIL = `users/detail/${Param.ID}`;
    static readonly EDIT = `users/edit/${Param.ID}`;
    static readonly DELETE = `users/delete/${Param.ID}`;

    static readonly detail = (id: string) => this.DETAIL.replace(Param.ID, id);
    static readonly edit = (id: string) => this.EDIT.replace(Param.ID, id);
    static readonly delete = (id: string) => this.DELETE.replace(Param.ID, id);
  };

  static readonly person = class {
    static readonly LIST = 'people/list';
    static readonly DETAIL = `people/detail/${Param.ID}`;
    static readonly ADD = 'people/add';
    static readonly EDIT = `people/edit/${Param.ID}`;
    static readonly DELETE = `people/delete/${Param.ID}`;

    static readonly list = () => `/${this.LIST}`;
    static readonly detail = (id: string) =>
      `/${this.DETAIL}`.replace(Param.ID, id);
    static readonly add = () => `/${this.ADD}`;
    static readonly edit = (id: string) =>
      `/${this.EDIT}`.replace(Param.ID, id);
    static readonly delete = (id: string) =>
      `/${this.DELETE}`.replace(Param.ID, id);
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

    static readonly register = () => ApiUrls.ROOT + this.REGISTER;
    static readonly login = () => ApiUrls.ROOT + this.LOGIN;
    static readonly logout = () => ApiUrls.ROOT + this.LOGOUT;
    static readonly whoami = () => ApiUrls.ROOT + this.WHO_AM_I;
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

    static readonly getByQuery = (q: EntityQuery) =>
      ApiUrls.ROOT + this.GET_BY_QUERY + `?q=${JSON.stringify(q)}`;
    static readonly getById = (id: string) =>
      ApiUrls.ROOT + this.GET_BY_ID.replace(Param.ID, id);
    static readonly add = () => ApiUrls.ROOT + this.ADD;
    static readonly update = (id: string) =>
      ApiUrls.ROOT + this.UPDATE.replace(Param.ID, id);
    static readonly delete = (id: string) =>
      ApiUrls.ROOT + this.DELETE.replace(Param.ID, id);
  };
}

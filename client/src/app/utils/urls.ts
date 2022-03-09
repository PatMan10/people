enum URLParam {
  ID = ':id',
}

export class UiUrls {
  static readonly DASHBOARD = 'dashboard';

  static readonly people = class {
    static readonly VIEW_ALL = 'people';
    static readonly VIEW_BY_ID = `people/${URLParam.ID}`;
    static readonly ADD = 'add-person';
    static readonly EDIT = `edit-person/${URLParam.ID}`;
    static readonly DELETE = `delete-person/${URLParam.ID}`;

    static viewAll = () => `/${this.VIEW_ALL}`;
    static viewById = (id: string) =>
      `/${this.VIEW_BY_ID}`.replace(URLParam.ID, id);
    static add = () => `/${this.ADD}`;
    static edit = (id: string) => `/${this.EDIT}`.replace(URLParam.ID, id);
    static delete = (id: string) => `/${this.DELETE}`.replace(URLParam.ID, id);
  };
}

export class ApiUrls {
  static readonly ROOT = 'http://localhost:8000';

  static readonly people = class {
    static readonly GET_ALL = '/people';
    static readonly GET_BY_ID = `/people/${URLParam.ID}`;
    static readonly ADD = `/people`;
    static readonly UPDATE = `/people/${URLParam.ID}`;
    static readonly DELETE = `/people/${URLParam.ID}`;

    static getAll = () => ApiUrls.ROOT + this.GET_ALL;
    static getById = (id: string) =>
      ApiUrls.ROOT + this.GET_BY_ID.replace(URLParam.ID, id.toString());
    static add = () => ApiUrls.ROOT + this.ADD;
    static update = (id: string) =>
      ApiUrls.ROOT + this.UPDATE.replace(URLParam.ID, id.toString());
    static delete = (id: string) =>
      ApiUrls.ROOT + this.DELETE.replace(URLParam.ID, id.toString());
  };
}

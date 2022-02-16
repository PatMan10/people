enum URLPlaceholder {
  ID = ':id',
}

export class UiUrls {
  static readonly DASHBOARD = 'dashboard';

  static readonly people = class {
    static readonly VIEW_ALL = 'people';
    static readonly VIEW_BY_ID = `people/${URLPlaceholder.ID}`;
  };
}

export class ApiUrls {
  static readonly ROOT = 'http://localhost:8000';

  static readonly people = class {
    static readonly GET_ALL = '/people';
    static readonly GET_BY_ID = `/people/${URLPlaceholder.ID}`;
    static readonly ADD = `/people`;
    static readonly UPDATE = `/people/${URLPlaceholder.ID}`;
    static readonly DELETE = `/people/${URLPlaceholder.ID}`;

    static getAll = () => ApiUrls.ROOT + this.GET_ALL;
    static getById = (id: string) =>
      ApiUrls.ROOT + this.GET_BY_ID.replace(URLPlaceholder.ID, id.toString());
    static add = () => ApiUrls.ROOT + this.ADD;
    static update = (id: string) =>
      ApiUrls.ROOT + this.UPDATE.replace(URLPlaceholder.ID, id.toString());
    static delete = (id: string) =>
      ApiUrls.ROOT + this.DELETE.replace(URLPlaceholder.ID, id.toString());
  };
}

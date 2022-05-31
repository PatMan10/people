import { IsString } from 'class-validator';

//####################
// CONSTRAINTS
//####################

export class Range {
  constructor(readonly MIN: number, readonly MAX: number) {}
}

export class Length extends Range {}

export class NumberConst {
  constructor(readonly RANGE: Range) {}
}

export class StringConst {
  constructor(readonly LENGTH: Length, readonly REGEX: RegExp) {}
}

export class GenericConst {
  static readonly REGEX = class {
    static readonly FREE = /.*/;
    static readonly ALPHA = /^[a-zA-Z]+$/;
    static readonly ALPHA_SYM = /^[a-zA-Z- ]+$/;
    static readonly ALPHANUMERIC = /^[a-zA-Z0-9]+$/;
    static readonly ALPHANUMERIC_SYM = /^[a-zA-Z0-9- ]+$/;
    static readonly NUMERIC = /^[0-9]+$/;
    static readonly NUMERIC_SYM = /^[0-9-]+$/;
  };
  static readonly OBJECT_ID = new StringConst(
    new Length(24, 24),
    GenericConst.REGEX.ALPHANUMERIC
  );
}

//####################
// TS MODEL UTILS
//####################

export const clone = <T>(o: T): T =>
  o ? JSON.parse(JSON.stringify(o)) : undefined;

export const json = <T>(o: T): T => Object.assign({}, o);

//####################
// TS MODEL
//####################

export class Generic<T> {
  [k: string]: T;
}

export class GenericModel extends Generic<any> {
  @IsString()
  readonly _id = '';
}

//####################
// QUERY MODEL
//####################

export class PageQuery {
  constructor(public number = 1, public limit = 30) {}
}

export class GenericQuery {
  values: Generic<string[]>;
  sort: Generic<1 | -1>;
  page: PageQuery;

  constructor(
    values = new Generic<string[]>(),
    page = new PageQuery(),
    sort = new Generic<1 | -1>()
  ) {
    this.values = values;
    this.page = page;
    this.sort = sort;
  }
}

export class PageResponse extends PageQuery {
  constructor(number: number, limit: number, public total: number) {
    super(number, limit);
  }
}

export class QueryResponse<T> {
  constructor(public items: T[], public page: PageResponse) {}
}

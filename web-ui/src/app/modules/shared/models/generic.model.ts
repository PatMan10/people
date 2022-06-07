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

export const dateToApiFormat = (d: Date) =>
  d.toLocaleString().substring(0, 10).split('/').join('-');

//####################
// TS MODEL
//####################

export class Obj<T = any> {
  [k: string]: T;

  constructor(o?: Obj<T>) {
    if (o) Object.keys(o).forEach((k) => (this[k] = o[k]));
  }
}

export class Entity extends Obj {
  @IsString()
  readonly _id = '';
}

//####################
// QUERY MODEL
//####################

export class Page {
  constructor(public number = 1, public limit = 30, public total?: number) {}
}

export class EntityQuery {
  values: Obj<string[]>;
  sort: Obj<1 | -1>;
  page: Page;

  constructor(
    values = new Obj<string[]>(),
    page = new Page(),
    sort = new Obj<1 | -1>()
  ) {
    this.values = values;
    this.page = page;
    this.sort = sort;
  }
}

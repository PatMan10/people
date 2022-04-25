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

export const clone = <T>(o: T): T => JSON.parse(JSON.stringify(o));

export const json = <T>(o: T): T => Object.assign({}, o);

//####################
// TS MODEL
//####################

export class Generic<T> {
  [k: string]: T;
}

export class GenericModel extends Generic<any> {
  readonly _id: string = '';

  constructor() {
    super();
  }
}

//####################
// QUERY MODEL
//####################

export class Query {
  constructor(
    public options: Options = new Options(),
    public values: Generic<string[]> = new Generic(),
    public page: Page = new Page(),
    public sort: Sort = new Sort('_id', Order.ASCENDING)
  ) {}
}

export class Sort {
  constructor(readonly path: string, readonly order: Order) {}
}

export enum Order {
  ASCENDING = 'asc',
  DESCENDING = 'desc',
}

export class Page {
  constructor(public number: number = 1, public size: number = 30) {}
}

export class Options {
  constructor(public exactMatch: boolean = false) {}
}

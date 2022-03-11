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
    static readonly FREE = new RegExp('');
    static readonly ALPHA = /^[A-Za-z]+$/;
    static readonly ALPHA_SYM = /^[A-Za-z-\s]+$/;
    static readonly ALPHANUMERIC = /^[a-zA-Z0-9]+$/;
    static readonly ALPHANUMERIC_SYM = /^[a-zA-Z0-9-\s]+$/;
    static readonly NUMERIC = /^\d+$/;
    static readonly NUMERIC_SYM = /^[\d-]+$/;
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

export enum SortOrder {
  ASCENDING = 'asc',
  DESCENDING = 'desc',
}

export class SortMeta {
  constructor(readonly path: string, readonly order: SortOrder) {}
}

export class PageMeta {
  constructor(public number: number = 1, public size: number = 30) {}
}

export class QueryOptions {
  constructor(public exactMatch: boolean = false) {}
}

export class GenericQuery {
  constructor(
    public options: QueryOptions = new QueryOptions(),
    public values: Generic<string[]> = new Generic(),
    public page: PageMeta = new PageMeta(),
    public sort: SortMeta = new SortMeta('_id', SortOrder.ASCENDING)
  ) {}
}
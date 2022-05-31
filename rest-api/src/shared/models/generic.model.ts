import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { Schema, Types } from 'mongoose';

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
    GenericConst.REGEX.ALPHANUMERIC,
  );
}

//####################
// TS MODEL UTILS
//####################

export const id = () => new Types.ObjectId();

export const idToStr = (id: string | ObjectId): string =>
  typeof id === 'string' ? id : id.toHexString();

export const validId = (id: string | Types.ObjectId) =>
  Types.ObjectId.isValid(id);

export const clone = <T>(o: T): T => JSON.parse(JSON.stringify(o));

export const json = <T>(o: T): T => Object.assign({}, o);

//####################
// TS MODEL
//####################

export type ObjectId = Types.ObjectId;

export class Generic<T> {
  [k: string]: T;
}

export class GenericModel extends Generic<any> {
  @IsString()
  @ApiProperty()
  readonly _id: string | Types.ObjectId = id();
}

//####################
// DB MODEL
//####################

export class GenericModelDbSchema extends Generic<any> {
  readonly _id = { type: Schema.Types.ObjectId };
  readonly __v = { type: Number };
}

//####################
// QUERY MODEL
//####################

export function regex(v: Generic<string[]>): Generic<RegExp> {
  const o = {};
  Object.keys(v).forEach((k) => (o[k] = new RegExp(v[k].join('|'))));
  return o;
}

export class Sort {
  constructor(public path = '_id', public order = Order.ASCENDING) {}
}

export enum Order {
  ASCENDING = 1,
  DESCENDING = -1,
}

export class PageQuery {
  constructor(public number = 1, public limit = 30) {}
}

export class GenericQuery {
  @Type(() => Generic<string[]>)
  values: Generic<string[]>;

  @Type(() => PageQuery)
  page: PageQuery;

  @Type(() => Sort)
  sort: Sort;

  constructor(
    values = new Generic<string[]>(),
    page = new PageQuery(),
    sort = new Sort(),
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
 constructor(
  public items: T[],
  public page: PageResponse,
 ){} 
}

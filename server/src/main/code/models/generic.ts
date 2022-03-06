import { Schema, Types } from "mongoose";
import Joi from "joi";

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
    static readonly FREE = new RegExp("");
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

export const _id = () => new Types.ObjectId();

export const valid_id = (_id: string | Types.ObjectId) =>
  Types.ObjectId.isValid(_id);

export const clone = <T>(o: T) => JSON.parse(JSON.stringify(o));

//####################
// TS MODEL
//####################

export class Generic<T> {
  [k: string]: T;
}

export class GenericModel extends Generic<any> {
  readonly _id: Types.ObjectId = _id();

  constructor() {
    super();
  }
}

//####################
// DB MODEL
//####################

export class GenericModelDbSchema extends Generic<any> {
  readonly _id = { type: Schema.Types.ObjectId };
  readonly __v = { type: Number };
}

//####################
// MODEL JOI SCHEMA
//####################

export class GenericModelJoiSchema {
  readonly _id = Joi.string()
    .min(GenericConst.OBJECT_ID.LENGTH.MIN)
    .max(GenericConst.OBJECT_ID.LENGTH.MAX)
    .pattern(GenericConst.REGEX.ALPHANUMERIC)
    .label("_id")
    .trim();

  readonly __v = Joi.number();
}

//####################
// QUERY MODEL
//####################

export enum SortOrder {
  ASCENDING = "asc",
  DESCENDING = "desc",
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
    public sort: SortMeta = new SortMeta("_id", SortOrder.ASCENDING)
  ) {}
}

//####################
// QUERY MODEL JOI SCHEMA
//####################

export class GenericQueryValuesJoiSchema {
  readonly _id = Joi.array().items(new GenericModelJoiSchema()._id);
}

export class GenericQueryJoiSchema<T extends GenericQueryValuesJoiSchema> {
  readonly values: object;

  constructor(valuesJoiSchema: T = new GenericQueryValuesJoiSchema() as T) {
    this.values = Joi.object(valuesJoiSchema);
  }

  readonly options = Joi.object({ exactMatch: Joi.boolean() });

  readonly page = Joi.object({
    number: Joi.number(),
    size: Joi.number(),
    total: Joi.number(),
  });

  readonly sort = Joi.object({
    path: Joi.string(),
    order: Joi.string(),
  });
}

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

//####################
// TS MODEL UTILS
//####################

export const id = () => new Types.ObjectId();

export const idToStr = (id: string | ObjectId): string =>
  typeof id === "string" ? id : id.toHexString();

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
  readonly _id: string | Types.ObjectId = id();

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

export class GenericJoiSchema extends Generic<object> {}

export class GenericModelJoiSchema extends GenericJoiSchema {
  readonly _id = Joi.string()
    .min(GenericConst.OBJECT_ID.LENGTH.MIN)
    .max(GenericConst.OBJECT_ID.LENGTH.MAX)
    .pattern(GenericConst.REGEX.ALPHANUMERIC)
    .label("_id")
    .trim();

  readonly __v = Joi.number();
}

export const validateObject = <
  oT extends GenericModel,
  sT extends GenericJoiSchema
>(
  obj: oT,
  schema: sT
) => Joi.object(json(schema)).validate(obj, { abortEarly: false });

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
// QUERY JOI SCHEMA
//####################

export class GenericQueryValuesJoiSchema extends GenericJoiSchema {
  readonly _id = Joi.array().items(new GenericModelJoiSchema()._id);
}

export class GenericQueryJoiSchema extends GenericJoiSchema {
  readonly values: object;

  constructor(
    valuesSchema: GenericQueryValuesJoiSchema = new GenericQueryValuesJoiSchema()
  ) {
    super();
    this.values = Joi.object(valuesSchema);
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

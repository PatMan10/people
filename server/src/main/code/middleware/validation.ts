import { Model } from "mongoose";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { GenericJoiSchema, validateObject, validId } from "../models/generic";
import { Body, Error, ValidationError } from "../models/http";
import { Messages } from "../utils/const";
import { respond } from "../utils/http";

const validate =
  (key: "payload" | "query", schema: GenericJoiSchema, message: string) =>
  (req: Request, res: Response, next: NextFunction) => {
    const obj = key === "payload" ? req.body.payload : req.query;
    const { error } = validateObject(obj, schema);

    // 400 invalid object
    if (error) {
      respond(
        StatusCodes.BAD_REQUEST,
        new Body(undefined, new ValidationError(message, error.details)),
        res
      );
      return;
    }
    next();
  };

export const validatePayload = (schema: GenericJoiSchema) =>
  validate("payload", schema, Messages.fail.INVALID_DATA);

export const validateQuery = (schema: GenericJoiSchema) =>
  validate("query", schema, Messages.fail.INVALID_QUERY);

export const validateId = (req: Request, res: Response, next: NextFunction) => {
  // 400 invalid id
  if (!validId(req.params.id)) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .send(new Body(undefined, new Error(Messages.fail.INVALID_ID)));
    return;
  }
  next();
};

export const exists =
  <T>(Model: Model<T>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    // 404 not found
    const found = (await Model.count({ _id: req.params.id })) === 1;
    if (!found) {
      respond(
        StatusCodes.NOT_FOUND,
        new Body(undefined, new Error(Messages.fail.NOT_FOUND)),
        res
      );
      return;
    }
    next();
  };

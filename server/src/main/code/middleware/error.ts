import { NextFunction, Request, RequestHandler, Response } from "express";
import { logger } from "../utils/misc";
import { StatusCodes } from "http-status-codes";
import { Messages } from "../utils/const";
import { respond } from "../utils/http";
import { Body, Error } from "../models/http";

export function errCat(handler: RequestHandler) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await handler(req, res, next);
    } catch (err) {
      next(err);
    }
  };
}

export function errHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  logger.error(err.message, err);
  respond(
    StatusCodes.INTERNAL_SERVER_ERROR,
    new Body(undefined, new Error(Messages.fail.INTERNAL_SERVER_ERROR)),
    res
  );
}


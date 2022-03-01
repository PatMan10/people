import {NextFunction, Request, RequestHandler, Response} from "express";
import {logger} from "../utils/misc";
import {StatusCodes} from "http-status-codes";
import {Messages} from "../utils/const";

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
    res.set("content-type", "application/json");
    res.status(StatusCodes.INTERNAL_SERVER_ERROR);
    res.send({message: Messages.fail.INTERNAL_SERVER_ERROR});
}
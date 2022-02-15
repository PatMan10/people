import { Router, Response } from "express";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import { Urls, Messages } from "./utils";
import { errCat } from "./middleware";
import { people } from "./models";

function respond<T>(status: number, data: T, res: Response) {
  res.set("content-type", "application/json");
  res.status(status);
  res.send(data);
}
const controller = Router();

controller.get(Urls.INDEX, (_req, res) => {
  respond(StatusCodes.OK, { message: Messages.success.WELCOME }, res);
});

controller.get(
  Urls.people.GET_ALL,
  errCat((_req, res) => {
    respond(StatusCodes.OK, Array.from(people.values()), res);
  })
);

controller.get(
  Urls.people.GET_BY_ID,
  errCat((req, res) => {
    //400 invalid id
    const { id } = req.params;
    if (id.length !== 21) {
      respond(
        StatusCodes.BAD_REQUEST,
        { message: Messages.fail.INVALID_ID },
        res
      );
      return;
    }
    //404 not found
    const person = people.get(id);
    if (!person) {
      respond(StatusCodes.NOT_FOUND, { message: Messages.fail.NOT_FOUND }, res);
      return;
    }
    respond(StatusCodes.OK, person, res);
  })
);

controller.get(Urls.WILD, (_req, res) => {
  res.set("content-type", "text/html");
  res.status(StatusCodes.NOT_FOUND);
  res.send({ message: ReasonPhrases.NOT_FOUND });
});

export default controller;

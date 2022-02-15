import { Router, Response } from "express";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import { Urls, Messages } from "./utils";
import { errCat } from "./middleware";
import { Name, people, Person, validPerson } from "./models";

function respond<T>(status: number, data: T, res: Response) {
  res.set("content-type", "application/json");
  res.status(status);
  res.send(data);
}
const controller = Router();

controller.get(Urls.INDEX, (_req, res) => {
  respond(StatusCodes.OK, { message: Messages.success.WELCOME }, res);
});

/* GET ALL */
controller.get(
  Urls.people.GET_ALL,
  errCat((_req, res) => {
    //200 success
    respond(StatusCodes.OK, Array.from(people.values()), res);
  })
);

/* GET BY ID */
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
    //200 success
    respond(StatusCodes.OK, person, res);
  })
);

/* POST */
controller.post(Urls.people.ADD, (req, res) => {
  // 400 invalid data
  const { name, birthday } = req.body;
  const person = new Person(
    new Name(name.first, name.middle, name.last),
    birthday
  );
  if (!validPerson(person)) {
    respond(
      StatusCodes.BAD_REQUEST,
      { message: Messages.fail.INVALID_DATA },
      res
    );
    return;
  }
  // 200 success
  people.set(person.id, person);
  respond(StatusCodes.CREATED, person, res);
});

/* DELETE BY ID */
controller.delete(
  Urls.people.DELETE,
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
    //200 success
    people.delete(id);
    respond(StatusCodes.OK, person, res);
  })
);

controller.get(Urls.WILD, (_req, res) => {
  respond(StatusCodes.NOT_FOUND, { message: ReasonPhrases.NOT_FOUND }, res);
});

export default controller;

import { Router } from "express";
import { Messages, Urls } from "../utils/const";
import { StatusCodes } from "http-status-codes";
import { people } from "../db";
import {
  Person,
  Name,
  Contact,
  validPerson,
  PersonModel,
  PersonJoiSchema,
} from "../models/person";
import { respond } from "../utils/http";
import { errCat } from "../middleware/error";
import { json, validate, validId } from "../models/generic";
import { Body, Error, ValidationError } from "../models/http";

const controller = Router();

/* GET ALL */
controller.get(
  Urls.people.GET_ALL,
  errCat(async (_req, res) => {
    // 200 success
    const people = await PersonModel.find();
    respond(StatusCodes.OK, new Body(people), res);
  })
);

/* GET BY ID */
controller.get(
  Urls.people.GET_BY_ID,
  errCat(async (req, res) => {
    // 400 invalid id
    const { id } = req.params;
    if (!validId(id)) {
      respond(
        StatusCodes.BAD_REQUEST,
        new Body(undefined, new Error(Messages.fail.INVALID_ID)),
        res
      );
      return;
    }
    // 404 not found
    const person = await PersonModel.findById(id);
    if (!person) {
      respond(
        StatusCodes.NOT_FOUND,
        new Body(undefined, new Error(Messages.fail.NOT_FOUND)),
        res
      );
      return;
    }
    // 200 success
    respond(StatusCodes.OK, new Body(person), res);
  })
);

/* ADD */
controller.post(
  Urls.people.ADD,
  errCat(async (req, res) => {
    const newPerson: Person = req.body.payload;

    // 400 invalid data
    const { error } = validate(newPerson, new PersonJoiSchema());
    if (error) {
      respond(
        StatusCodes.BAD_REQUEST,
        new Body(
          undefined,
          new ValidationError(Messages.fail.INVALID_DATA, error.details)
        ),
        res
      );
      return;
    }

    // 201 success
    const savedPerson: Person = await new PersonModel(newPerson).save();
    respond(StatusCodes.CREATED, new Body(savedPerson), res);
  })
);

/* UPDATE */
controller.put(
  Urls.people.UPDATE,
  errCat(async (req, res) => {
    // 400 invalid id
    const { id } = req.params;
    if (!validId(id)) {
      respond(
        StatusCodes.BAD_REQUEST,
        new Body(undefined, new Error(Messages.fail.INVALID_ID)),
        res
      );
      return;
    }

    const updatedPerson: Person = req.body.payload;

    // 400 invalid data
    const { error } = validate(updatedPerson, new PersonJoiSchema());
    if (error) {
      respond(
        StatusCodes.BAD_REQUEST,
        new Body(
          undefined,
          new ValidationError(Messages.fail.INVALID_DATA, error.details)
        ),
        res
      );
      return;
    }

    const savedPerson: Person | null = await PersonModel.findByIdAndUpdate(
      id,
      updatedPerson,
      { new: true }
    );

    // 404 not found
    if (!savedPerson) {
      respond(
        StatusCodes.NOT_FOUND,
        new Body(undefined, new Error(Messages.fail.NOT_FOUND)),
        res
      );
      return;
    }

    // 200 success
    respond(StatusCodes.CREATED, new Body(savedPerson), res);
  })
);

/* DELETE BY ID */
controller.delete(
  Urls.people.DELETE,
  errCat(async (req, res) => {
    // 400 invalid id
    const { id } = req.params;
    if (!validId(id)) {
      respond(
        StatusCodes.BAD_REQUEST,
        new Body(undefined, new Error(Messages.fail.INVALID_ID)),
        res
      );
      return;
    }

    // 404 not found
    const deletedPerson: Person | null = await PersonModel.findByIdAndDelete(
      id
    );
    if (!deletedPerson) {
      respond(
        StatusCodes.NOT_FOUND,
        new Body(undefined, new Error(Messages.fail.NOT_FOUND)),
        res
      );
      return;
    }

    // 200 success
    respond(StatusCodes.OK, new Body(deletedPerson), res);
  })
);

export default controller;


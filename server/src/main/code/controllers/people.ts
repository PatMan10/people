import { Router } from "express";
import { Urls } from "../utils/const";
import { StatusCodes } from "http-status-codes";
import { PersonModel, PersonJoiSchema } from "../models/person";
import { respond } from "../utils/http";
import { errCat } from "../middleware/error";
import { Body } from "../models/http";
import { validateId, validatePayload, exists } from "../middleware/validation";
import { id, validId } from "../models/generic";
import logger from "../utils/logger";

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
  [validateId, exists(PersonModel)],
  errCat(async (req, res) => {
    // 400 invalid id
    // 404 not found

    // 200 success
    const person = await PersonModel.findById(req.params.id);
    respond(StatusCodes.OK, new Body(person), res);
  })
);

/* ADD */
controller.post(
  Urls.people.ADD,
  validatePayload(new PersonJoiSchema()),
  errCat(async (req, res) => {
    // 400 invalid payload

    const { payload } = req.body;
    logger.debug("valid id => ", validId(payload._id));
    if (!validId(payload._id)) payload._id = id();

    // 201 success
    const savedPerson = await new PersonModel(req.body.payload).save();
    respond(StatusCodes.CREATED, new Body(savedPerson), res);
  })
);

/* UPDATE */
controller.put(
  Urls.people.UPDATE,
  [validateId, validatePayload(new PersonJoiSchema()), exists(PersonModel)],
  errCat(async (req, res) => {
    // 400 invalid id
    // 400 invalid payload
    // 404 not found

    // 200 success
    const savedPerson = await PersonModel.findByIdAndUpdate(
      req.params.id,
      req.body.payload,
      { new: true }
    );
    respond(StatusCodes.OK, new Body(savedPerson), res);
  })
);

/* DELETE BY ID */
controller.delete(
  Urls.people.DELETE,
  [validateId, exists(PersonModel)],
  errCat(async (req, res) => {
    // 400 invalid id
    // 404 not found

    // 200 success
    const deletedPerson = await PersonModel.findByIdAndDelete(req.params.id);
    respond(StatusCodes.OK, new Body(deletedPerson), res);
  })
);

export default controller;

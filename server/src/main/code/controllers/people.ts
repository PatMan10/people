import { Router } from "express";
import {Messages, Urls } from "../utils/const";
import {StatusCodes} from "http-status-codes";
import {people} from "../db";
import {Name, Person, validPerson} from "../models/person";
import {respond} from "../utils/http";
import {errCat} from "../middleware/error";

const controller = Router()

/* GET ALL */
controller.get(
    Urls.people.GET_ALL,
    errCat((_req, res) => {
        // 200 success
        respond(StatusCodes.OK, Array.from(people.values()), res);
    })
);

/* GET BY ID */
controller.get(
    Urls.people.GET_BY_ID,
    errCat((req, res) => {
        // 400 invalid id
        const { id } = req.params;
        if (id.length !== 21) {
            respond(
                StatusCodes.BAD_REQUEST,
                { message: Messages.fail.INVALID_ID },
                res
            );
            return;
        }
        // 404 not found
        const person = people.get(id);
        if (!person) {
            respond(StatusCodes.NOT_FOUND, { message: Messages.fail.NOT_FOUND }, res);
            return;
        }
        // 200 success
        respond(StatusCodes.OK, person, res);
    })
);

/* ADD */
controller.post(Urls.people.ADD, (req, res) => {
    // 400 invalid data
    const { name, birthday, phoneNumbers, emails } = req.body;
    const person = new Person(
        new Name(name.first, name.middle, name.last),
        birthday,
        phoneNumbers,
        emails
    );
    if (!validPerson(person)) {
        respond(
            StatusCodes.BAD_REQUEST,
            { message: Messages.fail.INVALID_DATA },
            res
        );
        return;
    }
    // 201 success
    people.set(person.id, person);
    respond(StatusCodes.CREATED, person, res);
});

/* UPDATE */
controller.put(Urls.people.UPDATE, (req, res) => {
    // 400 invalid id
    const { id } = req.params;
    if (id.length !== 21) {
        respond(
            StatusCodes.BAD_REQUEST,
            { message: Messages.fail.INVALID_ID },
            res
        );
        return;
    }
    // 400 invalid data
    if (!validPerson(req.body)) {
        respond(
            StatusCodes.BAD_REQUEST,
            { message: Messages.fail.INVALID_DATA },
            res
        );
        return;
    }
    // 404 not found
    const person = people.get(id);
    if (!person) {
        respond(StatusCodes.NOT_FOUND, { message: Messages.fail.NOT_FOUND }, res);
        return;
    }
    const { id: _id, ...rest } = req.body;
    const updatedPerson: Person = { id: person.id, ...rest };
    // 200 success
    people.set(updatedPerson.id, updatedPerson);
    respond(StatusCodes.CREATED, updatedPerson, res);
});

/* DELETE BY ID */
controller.delete(
    Urls.people.DELETE,
    errCat((req, res) => {
        // 400 invalid id
        const { id } = req.params;
        if (id.length !== 21) {
            respond(
                StatusCodes.BAD_REQUEST,
                { message: Messages.fail.INVALID_ID },
                res
            );
            return;
        }
        // 404 not found
        const person = people.get(id);
        if (!person) {
            respond(StatusCodes.NOT_FOUND, { message: Messages.fail.NOT_FOUND }, res);
            return;
        }
        // 200 success
        people.delete(id);
        respond(StatusCodes.OK, person, res);
    })
);

export default controller;
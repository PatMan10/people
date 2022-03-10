import req from "supertest";
import { StatusCodes } from "http-status-codes";
import app from "../../main/code/app";
import { Messages, Urls } from "../../main/code/utils/const";
import { Name, Person } from "../../main/code/models/person";
import { seedPeople, clearPeople, pac, DB } from "../../main/code/db";
import { clone, id, idToStr } from "../../main/code/models/generic";
import { Body } from "../../main/code/models/http";

describe("*-*-*-*-*-*-*-*-*-*- People API *-*-*-*-*-*-*-*-*-*-", () => {
  beforeEach(async () => {
    await DB.connect();
    await seedPeople();
  });

  afterEach(async () => {
    await clearPeople();
    await DB.disconnect();
  });

  describe(`---------- GET ${Urls.people.GET_ALL} ----------`, () => {
    const exec = () => req(app).get(Urls.people.getAll());

    it("200 return list of people", async () => {
      const res = await exec();
      const people: Person[] = res.body.payload;

      expect(res.status).toBe(StatusCodes.OK);
      expect(people.length > 0).toBeTruthy();
      const person = people[0];
      expect(person._id).toBeTruthy();
      expect(person.name.first).toBeTruthy();
      expect(person.name.last).toBeTruthy();
    });
  });

  describe(`---------- GET ${Urls.people.GET_BY_ID} ----------`, () => {
    const exec = (id: string) => req(app).get(Urls.people.getById(id));

    it("400 invalid id", async () => {
      const res = await exec("2");
      const { message } = res.body.error;

      expect(res.status).toBe(StatusCodes.BAD_REQUEST);
      expect(message).toBe(Messages.fail.INVALID_ID);
    });

    it("404 person not found", async () => {
      const res = await exec(id().toHexString());
      const { message } = res.body.error;

      expect(res.status).toBe(StatusCodes.NOT_FOUND);
      expect(message).toBe(Messages.fail.NOT_FOUND);
    });

    it("200 return person", async () => {
      const res = await exec(idToStr(pac._id));
      const person: Person = res.body.payload;

      expect(res.status).toBe(StatusCodes.OK);
      expect(person.id).toBe(pac.id);
      expect(person.name.first).toBe(pac.name.first);
      expect(person.name.last).toBe(pac.name.last);
    });
  });

  describe(`---------- POST ${Urls.people.ADD} ----------`, () => {
    const exec = (person: Person) =>
      req(app)
        .post(Urls.people.add())
        .set("content-type", "application/json")
        .send(new Body(person));

    it("400 no payload", async () => {
      const res = await exec(undefined as unknown as Person);
      const { message } = res.body.error;

      expect(res.status).toBe(StatusCodes.BAD_REQUEST);
      expect(message).toBe(Messages.fail.NO_PAYLOAD);
    });

    it("400 invalid data", async () => {
      const newPerson = new Person();
      const res = await exec(newPerson);
      const { message } = res.body.error;

      expect(res.status).toBe(StatusCodes.BAD_REQUEST);
      expect(message).toBe(Messages.fail.INVALID_PAYLOAD);
    });

    it("200 return saved person", async () => {
      const newPerson = new Person(
        new Name("patrick", ["junior"], "heynes", ["pj"]),
        "1995-09-30"
      );
      const res = await exec(newPerson);
      const person: Person = res.body.payload;

      expect(res.status).toBe(StatusCodes.CREATED);
      expect(person._id as string).toBe(idToStr(newPerson._id));
      expect(person.name.first).toBe(newPerson.name.first);
      expect(person.name.last).toBe(newPerson.name.last);
      expect(person.birthday).toBe(newPerson.birthday);
    });
  });

  describe(`---------- PUT ${Urls.people.UPDATE} ----------`, () => {
    const exec = (id: string, person: Person) =>
      req(app)
        .put(Urls.people.update(id))
        .set("content-type", "application/json")
        .send(new Body(person));

    it("400 invalid id", async () => {
      const res = await exec("2", new Person());
      const { message } = res.body.error;

      expect(res.status).toBe(StatusCodes.BAD_REQUEST);
      expect(message).toBe(Messages.fail.INVALID_ID);
    });

    it("400 no payload", async () => {
      const res = await exec(idToStr(pac._id), undefined as unknown as Person);
      const { message } = res.body.error;

      expect(res.status).toBe(StatusCodes.BAD_REQUEST);
      expect(message).toBe(Messages.fail.NO_PAYLOAD);
    });

    it("400 invalid data", async () => {
      const updatedPerson = new Person();
      const res = await exec(idToStr(pac._id), updatedPerson);
      const { message } = res.body.error;

      expect(res.status).toBe(StatusCodes.BAD_REQUEST);
      expect(message).toBe(Messages.fail.INVALID_PAYLOAD);
    });

    it("404 person not found", async () => {
      const res = await exec(id().toHexString(), pac);
      const { message } = res.body.error;

      expect(res.status).toBe(StatusCodes.NOT_FOUND);
      expect(message).toBe(Messages.fail.NOT_FOUND);
    });

    it("200 return saved person", async () => {
      const updatedPerson = clone(pac);
      updatedPerson.name.first = "siya";
      updatedPerson.name.last = "landela";
      updatedPerson.birthday = "1985-05-05";

      const res = await exec(idToStr(pac._id), updatedPerson);
      const person: Person = res.body.payload;

      expect(res.status).toBe(StatusCodes.OK);
      expect(person._id).toBe(idToStr(pac._id));
      expect(person.name.first).toBe(updatedPerson.name.first);
      expect(person.name.last).toBe(updatedPerson.name.last);
      expect(person.birthday).toBe(updatedPerson.birthday);
    });
  });

  describe(`---------- DELETE ${Urls.people.DELETE} ----------`, () => {
    const exec = (id: string) => req(app).delete(Urls.people.delete(id));

    it("400 invalid id", async () => {
      const res = await exec("2");
      const { message } = res.body.error;

      expect(res.status).toBe(StatusCodes.BAD_REQUEST);
      expect(message).toBe(Messages.fail.INVALID_ID);
    });

    it("404 person not found", async () => {
      const res = await exec(id().toHexString());
      const { message } = res.body.error;

      expect(res.status).toBe(StatusCodes.NOT_FOUND);
      expect(message).toBe(Messages.fail.NOT_FOUND);
    });

    it("200 return deleted person", async () => {
      const res = await exec(idToStr(pac._id));
      const person: Person = res.body.payload;

      expect(res.status).toBe(StatusCodes.OK);
      expect(person._id).toBe(idToStr(pac._id));
      expect(person.name.first).toBe(pac.name.first);
      expect(person.name.last).toBe(pac.name.last);
    });
  });
});

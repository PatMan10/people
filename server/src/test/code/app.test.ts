import req from "supertest";
import { StatusCodes } from "http-status-codes";
import app from "../../main/code/app";
import { Messages, Urls } from "../../main/code/utils";
import { Person, pac } from "../../main/code/models";
import { nanoid } from "nanoid";

describe("*-*-*-*-*-*-*-*-*-*- People API *-*-*-*-*-*-*-*-*-*-", () => {
  describe(`---------- GET ${Urls.people.GET_ALL} ----------`, () => {
    const exec = () => req(app).get(Urls.people.getAll());

    it("200 return list of people", async () => {
      const res = await exec();
      const people: Person[] = res.body;

      expect(res.status).toBe(StatusCodes.OK);
      expect(people.length > 0).toBeTruthy();
      const person = people[0];
      expect(person.id).toBeTruthy();
      expect(person.name.first).toBeTruthy();
      expect(person.name.last).toBeTruthy();
    });
  });

  describe(`---------- GET ${Urls.people.GET_BY_ID} ----------`, () => {
    const exec = (id: string) => req(app).get(Urls.people.getById(id));

    it("400 invalid id", async () => {
      const res = await exec("2");
      const { message } = res.body;

      expect(res.status).toBe(StatusCodes.BAD_REQUEST);
      expect(message).toBe(Messages.fail.INVALID_ID);
    });

    it("404 person not found", async () => {
      const res = await exec(nanoid());
      const { message } = res.body;

      expect(res.status).toBe(StatusCodes.NOT_FOUND);
      expect(message).toBe(Messages.fail.NOT_FOUND);
    });

    it("200 return person", async () => {
      const res = await exec(pac.id);
      const person: Person = res.body;

      expect(res.status).toBe(StatusCodes.OK);
      expect(person.id).toBe(pac.id);
      expect(person.name.first).toBe(pac.name.first);
      expect(person.name.last).toBe(pac.name.last);
    });
  });
});

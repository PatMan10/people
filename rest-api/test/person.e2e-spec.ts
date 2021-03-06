import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, HttpStatus, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import mongoose, { model, Model } from 'mongoose';

import config from '../src/app/app.config';
import { setupMiddleware } from '../src/main';
import { AppModule } from '../src/app/app.module';
import { Messages, Urls } from '../src/shared/utils/const';
import {
  clone,
  id,
  EntityQuery,

} from '../src/shared/models/generic.model';
import { Name, Person, PersonSchema } from '../src/person/person.model';
import { getPeople } from '../src/person/person.seed';
import {
  ErrorDto, GetByQueryDto,
  ValidationErrorDto
} from "../src/shared/models/http.model";
import { god } from '../src/user/user.seed';

describe('PersonController (e2e)', () => {
  let app: INestApplication;
  let PersonModel: Model<Person>;

  beforeAll(async () => {
    PersonModel = model(Person.name, PersonSchema);
    await mongoose.connect(config.DB_URI);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await app.close();
    PersonModel = undefined;
    app = undefined;
  });

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    setupMiddleware(app, config);
    await app.init();
  });

  describe('getAll', () => {
    const people = getPeople();

    beforeEach(async () => {
      await PersonModel.insertMany(people);
    });

    afterEach(async () => {
      await PersonModel.deleteMany();
    });

    const exec = (q = new EntityQuery()) =>
      request(app.getHttpServer()).get(Urls.person.getByQuery(q));

    it(`200: return query response`, async () => {
      const q = new EntityQuery();
      q.values['name.first'] = ['shawn', 'marshal'];
      const res = await exec(q);
      const payload: GetByQueryDto<Person> = res.body;

      expect(res.status).toBe(HttpStatus.OK);
      expect(payload.items.length).toBe(2);
      expect(payload.page.number).toBe(1);
      expect(payload.page.total).toBe(1);
    });
  });

  describe('getById', () => {
    const people = getPeople();

    beforeEach(async () => {
      await PersonModel.insertMany(people);
    });

    afterEach(async () => {
      await PersonModel.deleteMany();
    });

    const exec = (id: string) =>
      request(app.getHttpServer()).get(Urls.person.getById(id));

    it(`400: invalid id`, async () => {
      const res = await exec('id');
      const error: ErrorDto = res.body;

      expect(res.status).toBe(HttpStatus.BAD_REQUEST);
      expect(error.status).toBe(HttpStatus.BAD_REQUEST);
      expect(error.message).toBe(Messages.fail.INVALID_ID);
    });

    it(`404: not found`, async () => {
      const res = await exec(id().toHexString());
      const error: ErrorDto = res.body;

      expect(res.status).toBe(HttpStatus.NOT_FOUND);
      expect(error.status).toBe(HttpStatus.NOT_FOUND);
      expect(error.message).toBe(Messages.fail.NOT_FOUND);
    });

    it(`200: return person`, async () => {
      const person = people[0];
      const res = await exec(person._id.toString());
      const payload: Person = res.body;

      expect(res.status).toBe(HttpStatus.OK);
      expect(payload._id).toBe(person._id.toString());
      expect(payload.name.first).toBe(person.name.first);
    });
  });

  describe('add', () => {
    const people = getPeople();

    afterEach(async () => {
      await PersonModel.deleteMany();
    });

    const exec = (person: Person) =>
      request(app.getHttpServer()).post(Urls.person.ADD).send(person);

    it(`400: invalid payload`, async () => {
      const res = await exec(new Person(god._id));
      const error: ValidationErrorDto = res.body;

      expect(res.status).toBe(HttpStatus.BAD_REQUEST);
      expect(error.status).toBe(HttpStatus.BAD_REQUEST);
      expect(error.message).toBe(Messages.fail.INVALID_PAYLOAD);
      expect(error.details.length > 0).toBeTruthy();
    });

    it(`201: return new person`, async () => {
      const person = clone(people[2]);
      const res = await exec(person);
      const payload: Person = res.body;

      expect(res.status).toBe(HttpStatus.CREATED);
      expect(payload._id).toBeDefined();
      expect(payload.name.first).toBe(person.name.first);
    });
  });

  describe(`update`, () => {
    const people = getPeople();

    beforeEach(async () => {
      await PersonModel.insertMany(people);
    });

    afterEach(async () => {
      await PersonModel.deleteMany();
    });

    const exec = (id: string, person: Person) =>
      request(app.getHttpServer()).put(Urls.person.update(id)).send(person);

    it('400 invalid id', async () => {
      const res = await exec('2', new Person(god._id));
      const error: ErrorDto = res.body;

      expect(res.status).toBe(HttpStatus.BAD_REQUEST);
      expect(error.status).toBe(HttpStatus.BAD_REQUEST);
      expect(error.message).toBe(Messages.fail.INVALID_ID);
    });

    it('400 invalid data', async () => {
      const res = await exec(people[0]._id.toString(), new Person(god._id));
      const error: ValidationErrorDto = res.body;

      expect(res.status).toBe(HttpStatus.BAD_REQUEST);
      expect(error.status).toBe(HttpStatus.BAD_REQUEST);
      expect(error.message).toBe(Messages.fail.INVALID_PAYLOAD);
      expect(error.details.length > 0).toBeTruthy();
    });

    it('404 person not found', async () => {
      const person = new Person(
        god._id,
        new Name('not', [], 'found'),
        '1234-11-12',
      );
      const res = await exec(person._id.toString(), person);
      const error: ErrorDto = res.body;

      expect(res.status).toBe(HttpStatus.NOT_FOUND);
      expect(error.status).toBe(HttpStatus.NOT_FOUND);
      expect(error.message).toBe(Messages.fail.NOT_FOUND);
    });

    it('200 return saved person', async () => {
      const updatedPerson = clone(people[2]);
      updatedPerson.name.first = 'siya';
      updatedPerson.name.last = 'landela';
      updatedPerson.birthday = '1985-05-05';

      const res = await exec(updatedPerson._id.toString(), updatedPerson);
      const payload: Person = res.body;

      expect(res.status).toBe(HttpStatus.OK);
      expect(payload._id).toBe(updatedPerson._id.toString());
      expect(payload.name.first).toBe(updatedPerson.name.first);
      expect(payload.name.last).toBe(updatedPerson.name.last);
      expect(payload.birthday).toBe(updatedPerson.birthday);
    });
  });

  describe('delete', () => {
    const people = getPeople();

    beforeEach(async () => {
      await PersonModel.insertMany(people);
    });

    afterEach(async () => {
      await PersonModel.deleteMany();
    });

    const exec = (id: string) =>
      request(app.getHttpServer()).delete(Urls.person.delete(id));

    it(`400: invalid id`, async () => {
      const res = await exec('id');
      const error: ErrorDto = res.body;

      expect(res.status).toBe(HttpStatus.BAD_REQUEST);
      expect(error.status).toBe(HttpStatus.BAD_REQUEST);
      expect(error.message).toBe(Messages.fail.INVALID_ID);
    });

    it(`404: not found`, async () => {
      const res = await exec(id().toHexString());
      const error: ErrorDto = res.body;

      expect(res.status).toBe(HttpStatus.NOT_FOUND);
      expect(error.status).toBe(HttpStatus.NOT_FOUND);
      expect(error.message).toBe(Messages.fail.NOT_FOUND);
    });

    it(`200: return person`, async () => {
      const person = people[0];
      const res = await exec(person._id.toString());
      const payload: Person = res.body;

      expect(res.status).toBe(HttpStatus.OK);
      expect(payload._id).toBe(person._id.toString());
      expect(payload.name.first).toBe(person.name.first);
    });
  });
});

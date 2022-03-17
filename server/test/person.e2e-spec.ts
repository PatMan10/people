import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, HttpStatus, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import mongoose, { model, Model } from 'mongoose';

import config from '../src/app/app.config';
import { setupMiddleware } from '../src/main';
import { AppModule } from '../src/app/app.module';
import { Messages, Urls } from '../src/common/utils/const';
import { clone, id } from '../src/common/models/generic.model';
import { Name, Person, PersonSchema } from '../src/person/person.model';
import { people } from '../src/person/person.seed';
import { Error, ValidationError } from '../src/common/models/http.model';

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
    beforeEach(async () => {
      await PersonModel.insertMany(people);
    });

    afterEach(async () => {
      await PersonModel.deleteMany();
    });

    const exec = () => request(app.getHttpServer()).get(Urls.people.GET_ALL);

    it(`200: return list of people`, async () => {
      const res = await exec();
      const payload: Person[] = res.body;

      expect(res.status).toBe(HttpStatus.OK);
      expect(payload.length).toBe(people.length);
    });
  });

  describe('getById', () => {
    beforeEach(async () => {
      await PersonModel.insertMany(people);
    });

    afterEach(async () => {
      await PersonModel.deleteMany();
    });

    const exec = (id: string) =>
      request(app.getHttpServer()).get(Urls.people.getById(id));

    it(`400: invalid id`, async () => {
      const res = await exec('id');
      const error: Error = res.body;

      expect(res.status).toBe(HttpStatus.BAD_REQUEST);
      expect(error.status).toBe(HttpStatus.BAD_REQUEST);
      expect(error.message).toBe(Messages.fail.INVALID_ID);
    });

    it(`404: not found`, async () => {
      const res = await exec(id().toHexString());
      const error: Error = res.body;

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
    afterEach(async () => {
      await PersonModel.deleteMany();
    });

    const exec = (person: Person) =>
      request(app.getHttpServer()).post(Urls.people.ADD).send(person);

    it(`400: invalid payload`, async () => {
      const res = await exec(new Person());
      const error: ValidationError = res.body;

      expect(res.status).toBe(HttpStatus.BAD_REQUEST);
      expect(error.status).toBe(HttpStatus.BAD_REQUEST);
      expect(error.message).toBe(Messages.fail.INVALID_PAYLOAD);
      expect(error.details.length > 0).toBeTruthy();
    });

    it(`201: return new person`, async () => {
      const person = clone(people[2]);
      (person as any)._id = '';
      const res = await exec(person);
      const payload: Person = res.body;

      expect(res.status).toBe(HttpStatus.CREATED);
      expect(payload._id).toBeDefined();
      expect(payload.name.first).toBe(person.name.first);
    });
  });

  describe(`update`, () => {
    beforeEach(async () => {
      await PersonModel.insertMany(people);
    });

    afterEach(async () => {
      await PersonModel.deleteMany();
    });

    const exec = (id: string, person: Person) =>
      request(app.getHttpServer()).put(Urls.people.update(id)).send(person);

    it('400 invalid id', async () => {
      const res = await exec('2', new Person());
      const error: Error = res.body;

      expect(res.status).toBe(HttpStatus.BAD_REQUEST);
      expect(error.status).toBe(HttpStatus.BAD_REQUEST);
      expect(error.message).toBe(Messages.fail.INVALID_ID);
    });

    it('400 invalid data', async () => {
      const res = await exec(people[0]._id.toString(), new Person());
      const error: ValidationError = res.body;

      expect(res.status).toBe(HttpStatus.BAD_REQUEST);
      expect(error.status).toBe(HttpStatus.BAD_REQUEST);
      expect(error.message).toBe(Messages.fail.INVALID_PAYLOAD);
      expect(error.details.length > 0).toBeTruthy();
    });

    it('404 person not found', async () => {
      const person = new Person(new Name('not', [], 'found'), '1234-11-12');
      const res = await exec(person._id.toString(), person);
      const error: Error = res.body;

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
});

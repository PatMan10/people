import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, HttpStatus, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import mongoose, { model, Model } from 'mongoose';

import config from '../src/app/app.config';
import { Messages, Urls } from '../src/common/utils/const';
import { AppModule } from '../src/app/app.module';
import { id } from '../src/common/models/generic.model';
import { Person, PersonSchema } from '../src/person/person.model';
import { people } from '../src/person/person.seed';
import { Error } from '../src/common/models/http.model';
import { AllExceptionsFilter } from '../src/common/filters/all-exception.filter';

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
    app.useGlobalPipes(
      new ValidationPipe({ transform: true, whitelist: true }),
    );
    app.useGlobalFilters(new AllExceptionsFilter());
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
});

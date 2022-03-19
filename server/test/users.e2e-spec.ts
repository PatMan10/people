import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, HttpStatus, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import mongoose, { model, Model } from 'mongoose';

import config from '../src/app/app.config';
import { setupMiddleware } from '../src/main';
import { AppModule } from '../src/app/app.module';
import { Messages, Urls } from '../src/common/utils/const';
import { clone, id } from '../src/common/models/generic.model';
import { User, UserRole, UserSchema } from '../src/user/user.model';
import { users } from '../src/user/user.seed';
import {
  Exception,
  ValidationException,
} from '../src/common/models/http.model';

describe('UserController (e2e)', () => {
  let app: INestApplication;
  let UserModel: Model<User>;

  beforeAll(async () => {
    UserModel = model(User.name, UserSchema);
    await mongoose.connect(config.DB_URI);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await app.close();
    UserModel = undefined;
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

  describe('getById', () => {
    beforeEach(async () => {
      await UserModel.insertMany(users);
    });

    afterEach(async () => {
      await UserModel.deleteMany();
    });

    const exec = (id: string) =>
      request(app.getHttpServer()).get(Urls.user.getById(id));

    it(`400: invalid id`, async () => {
      const res = await exec('id');
      const error: Exception = res.body;

      expect(res.status).toBe(HttpStatus.BAD_REQUEST);
      expect(error.status).toBe(HttpStatus.BAD_REQUEST);
      expect(error.message).toBe(Messages.fail.INVALID_ID);
    });

    it(`404: not found`, async () => {
      const res = await exec(id().toHexString());
      const error: Exception = res.body;

      expect(res.status).toBe(HttpStatus.NOT_FOUND);
      expect(error.status).toBe(HttpStatus.NOT_FOUND);
      expect(error.message).toBe(Messages.fail.NOT_FOUND);
    });

    it(`200: return user`, async () => {
      const user = users[0];
      const res = await exec(user._id.toString());
      const payload: User = res.body;

      expect(res.status).toBe(HttpStatus.OK);
      expect(payload._id).toBe(user._id.toString());
      expect(payload.handle).toBe(user.handle);
    });
  });

  describe(`update`, () => {
    beforeEach(async () => {
      await UserModel.insertMany(users);
    });

    afterEach(async () => {
      await UserModel.deleteMany();
    });

    const exec = (id: string, user: User) =>
      request(app.getHttpServer()).put(Urls.user.update(id)).send(user);

    it('400 invalid id', async () => {
      const res = await exec('2', new User());
      const error: Exception = res.body;

      expect(res.status).toBe(HttpStatus.BAD_REQUEST);
      expect(error.status).toBe(HttpStatus.BAD_REQUEST);
      expect(error.message).toBe(Messages.fail.INVALID_ID);
    });

    it('400 invalid data', async () => {
      const res = await exec(users[0]._id.toString(), new User());
      const error: ValidationException = res.body;

      expect(res.status).toBe(HttpStatus.BAD_REQUEST);
      expect(error.status).toBe(HttpStatus.BAD_REQUEST);
      expect(error.message).toBe(Messages.fail.INVALID_PAYLOAD);
      expect(error.details.length > 0).toBeTruthy();
    });

    it('404 user not found', async () => {
      const user = new User('handle', 'email@here.com', 'password');
      const res = await exec(user._id.toString(), user);
      const error: Exception = res.body;

      expect(res.status).toBe(HttpStatus.NOT_FOUND);
      expect(error.status).toBe(HttpStatus.NOT_FOUND);
      expect(error.message).toBe(Messages.fail.NOT_FOUND);
    });

    it('200 return saved user', async () => {
      const updatedUser = clone(users[1]);
      updatedUser.handle = 'siya';
      updatedUser.email = 'siya@gmail.com';

      const res = await exec(updatedUser._id.toString(), updatedUser);
      const payload: User = res.body;

      expect(res.status).toBe(HttpStatus.OK);
      expect(payload._id).toBe(updatedUser._id.toString());
      expect(payload.handle).toBe(updatedUser.handle);
      expect(payload.email).toBe(updatedUser.email);
    });
  });

  describe('delete', () => {
    beforeEach(async () => {
      await UserModel.insertMany(users);
    });

    afterEach(async () => {
      await UserModel.deleteMany();
    });

    const exec = (id: string) =>
      request(app.getHttpServer()).delete(Urls.user.delete(id));

    it(`400: invalid id`, async () => {
      const res = await exec('id');
      const error: Exception = res.body;

      expect(res.status).toBe(HttpStatus.BAD_REQUEST);
      expect(error.status).toBe(HttpStatus.BAD_REQUEST);
      expect(error.message).toBe(Messages.fail.INVALID_ID);
    });

    it(`404: not found`, async () => {
      const res = await exec(id().toHexString());
      const error: Exception = res.body;

      expect(res.status).toBe(HttpStatus.NOT_FOUND);
      expect(error.status).toBe(HttpStatus.NOT_FOUND);
      expect(error.message).toBe(Messages.fail.NOT_FOUND);
    });

    it(`200: return user`, async () => {
      const user = users[0];
      const res = await exec(user._id.toString());
      const payload: User = res.body;

      expect(res.status).toBe(HttpStatus.OK);
      expect(payload._id).toBe(user._id.toString());
      expect(payload.handle).toBe(user.handle);
    });
  });
});

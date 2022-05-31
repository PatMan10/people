import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, HttpStatus } from '@nestjs/common';
import * as request from 'supertest';
import mongoose, { model, Model } from 'mongoose';

import config from '../src/app/app.config';
import { setupMiddleware } from '../src/main';
import { AppModule } from '../src/app/app.module';
import { Messages, Urls } from '../src/shared/utils/const';
import { clone } from '../src/shared/models/generic.model';
import {
  User,
  GetUserDto,
  CreateUserDto,
  UserSchema,
} from '../src/user/user.model';
import { Credentials, hash } from '../src/auth/auth.model';
import { getUsers } from '../src/user/user.seed';
import {
  ErrorResponse,
  ValidationErrorResponse,
} from '../src/shared/models/http.model';

describe('AuthController (e2e)', () => {
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

  describe('register', () => {
    const users = getUsers();

    beforeEach(async () => {
      await UserModel.insertMany(users);
    });

    afterEach(async () => {
      await UserModel.deleteMany();
    });

    const exec = (user: CreateUserDto) =>
      request(app.getHttpServer()).post(Urls.auth.REGISTER).send(user);

    it(`400: invalid payload`, async () => {
      const res = await exec(new User());
      const error: ValidationErrorResponse = res.body;

      expect(res.status).toBe(HttpStatus.BAD_REQUEST);
      expect(error.status).toBe(HttpStatus.BAD_REQUEST);
      expect(error.message).toBe(Messages.fail.INVALID_PAYLOAD);
      expect(error.details.length > 0).toBeTruthy();
    });

    it(`400: duplicate email`, async () => {
      const res = await exec(users[0]);
      const error: ErrorResponse = res.body;

      expect(res.status).toBe(HttpStatus.BAD_REQUEST);
      expect(error.status).toBe(HttpStatus.BAD_REQUEST);
      expect(error.message).toBe(Messages.fail.auth.DUPLICATE_EMAIL);
    });

    it(`400: duplicate handle`, async () => {
      const user = clone(users[0]);
      user.email = 'newUser@people.com';
      const res = await exec(user);
      const error: ErrorResponse = res.body;

      expect(res.status).toBe(HttpStatus.BAD_REQUEST);
      expect(error.status).toBe(HttpStatus.BAD_REQUEST);
      expect(error.message).toBe(Messages.fail.auth.DUPLICATE_HANDLE);
    });

    it(`201: return new user`, async () => {
      const user = new User('lUser', 'user@email.com', 'password#123');
      const res = await exec(user);
      const payload: User = res.body;

      expect(res.status).toBe(HttpStatus.CREATED);
      expect(payload._id).toBeDefined();
      expect(payload.handle).toBe(user.handle);
      expect(payload.email).toBe(user.email);
      expect(payload.password).not.toBeDefined();
    });
  });

  describe('login', () => {
    const users = getUsers();

    beforeEach(async () => {
      const hashedUsers = clone(users);

      for (const u of hashedUsers) u.password = await hash(u.password);

      await UserModel.insertMany(hashedUsers);
    });

    afterEach(async () => {
      await UserModel.deleteMany();
    });

    const exec = (credentials: Credentials) =>
      request(app.getHttpServer()).post(Urls.auth.LOGIN).send(credentials);

    it(`400: invalid payload`, async () => {
      const res = await exec(new Credentials());
      const error: ValidationErrorResponse = res.body;

      expect(res.status).toBe(HttpStatus.BAD_REQUEST);
      expect(error.status).toBe(HttpStatus.BAD_REQUEST);
      expect(error.message).toBe(Messages.fail.INVALID_PAYLOAD);
      expect(error.details.length > 0).toBeTruthy();
    });

    it(`400: unknown email`, async () => {
      const credentials = new Credentials('some@email.com', 'password');
      const res = await exec(credentials);
      const error: ErrorResponse = res.body;

      expect(res.status).toBe(HttpStatus.BAD_REQUEST);
      expect(error.status).toBe(HttpStatus.BAD_REQUEST);
      expect(error.message).toBe(Messages.fail.auth.INVALID_CREDENTIALS);
    });

    it(`400: invalid password`, async () => {
      const credentials = new Credentials(users[1].email, 'password');
      const res = await exec(credentials);
      const error: ErrorResponse = res.body;

      expect(res.status).toBe(HttpStatus.BAD_REQUEST);
      expect(error.status).toBe(HttpStatus.BAD_REQUEST);
      expect(error.message).toBe(Messages.fail.auth.INVALID_CREDENTIALS);
    });

    it(`200: return logged in user`, async () => {
      const user = users[1];
      const credentials = new Credentials(user.email, user.password);
      const res = await exec(credentials);
      const payload: GetUserDto = res.body;

      expect(res.status).toBe(HttpStatus.OK);
      expect(payload._id).toBeDefined();
      expect(payload.handle).toBe(user.handle);
      expect(payload.email).toBe(user.email);
      expect((payload as any).password).not.toBeDefined();
    });
  });
});

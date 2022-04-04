import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, HttpStatus } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app/app.module';
import { Messages, Urls } from '../src/common/utils/const';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  const exec = () => request(app.getHttpServer()).get(Urls.INDEX);

  it('200: return welcome message', async () => {
    const res = await exec();
    expect(res.status).toBe(HttpStatus.OK);
    expect(res.text).toBe(Messages.success.WELCOME);
  });
});

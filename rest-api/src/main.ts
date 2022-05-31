import { ValidationPipe, INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as morgan from 'morgan';
const cookieSession = require('cookie-session');

import config, { Config, Env } from './app/app.config';
import { AppModule } from './app/app.module';
import { AllExceptionsFilter } from './app/app.filters';
import { exceptionFactory, ParseQueryPipe } from './app/app.pipes';
import logger from './shared/utils/logger';

if (require.main === module)
  (async () => {
    const app = await NestFactory.create(AppModule);
    app.enableCors({ origin: /http:\/\/localhost*/, credentials: true });
    setupMiddleware(app, config);

    await app.listen(config.PORT);
    logger.log(`server running on: ${await app.getUrl()}`);
    logger.log(config);
  })();

export const setupMiddleware = (
  app: INestApplication,
  config: Config,
): void => {
  app.useGlobalPipes(
    new ParseQueryPipe(),
    new ValidationPipe({
      transform: true,
      whitelist: true,
      exceptionFactory,
    }),
  );
  app.useGlobalFilters(new AllExceptionsFilter());
  app.use(
    cookieSession({
      keys: [config.SESSION_KEY],
    }),
  );
  if (config.ENV !== Env.PROD) app.use(morgan('tiny'));
};

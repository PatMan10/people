import { ValidationPipe, INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as morgan from 'morgan';
const cookieSession = require('cookie-session');

import config, { Config, Env } from './app/app.config';
import { AppModule } from './app/app.module';
import { AllExceptionsFilter } from './common/filters/all-exception.filter';
import { exceptionFactory } from './common/pipes/validation.pipe';
import logger from './common/utils/logger';

if (require.main === module)
  (async () => {
    const app = await NestFactory.create(AppModule, {
      cors: true,
    });
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
  if (config.ENV === Env.DEV) app.use(morgan('tiny'));
};

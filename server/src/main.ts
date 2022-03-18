import {
  BadRequestException,
  ValidationPipe,
  INestApplication,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as morgan from 'morgan';

import config, { Config, Env } from './app/app.config';
import { AppModule } from './app/app.module';
import { AllExceptionsFilter } from './common/filters/all-exception.filter';
import { ValidationException } from './common/models/http.model';
import { Messages } from './common/utils/const';
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
      exceptionFactory: (errorsArg) => {
        const errors = errorsArg.map(({ property, value, constraints }) => ({
          property,
          value,
          constraints,
        }));
        throw new BadRequestException(
          new ValidationException(Messages.fail.INVALID_PAYLOAD, errors),
        );
      },
    }),
  );
  app.useGlobalFilters(new AllExceptionsFilter());
  if (config.ENV === Env.DEV) app.use(morgan('tiny'));
};

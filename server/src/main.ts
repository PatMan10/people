import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as morgan from 'morgan';

import config from './app/app.config';
import { AppModule } from './app/app.module';
import { AllExceptionsFilter } from './common/filters/all-exception.filter';
import logger from './common/utils/logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.useGlobalFilters(new AllExceptionsFilter());
  app.use(morgan('tiny'));

  if (require.main === module) {
    await app.listen(config.PORT);
    logger.log(`server running on: ${await app.getUrl()}`);
    logger.log(config);
  }
}
bootstrap();

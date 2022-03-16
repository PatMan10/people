import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import config from './app.config';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './filters/all-exception.filter';
import logger from './utils/logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.useGlobalFilters(new AllExceptionsFilter());

  if (require.main === module)
    await app.listen(config.PORT, () => {
      logger.info('server running');
      logger.info(config);
    });
}
bootstrap();

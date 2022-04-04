import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ValidateIdMiddleware } from '../common/middleware/validation.middleware';
import { Urls } from '../common/utils/const';
import { PersonController } from './person.controller';
import { Person, PersonSchema } from './person.model';
import { PersonService } from './person.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Person.name, schema: PersonSchema }]),
  ],
  controllers: [PersonController],
  providers: [PersonService],
})
export class PersonModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ValidateIdMiddleware)
      .forRoutes(Urls.person.GET_BY_ID, Urls.person.UPDATE, Urls.person.DELETE);
  }
}

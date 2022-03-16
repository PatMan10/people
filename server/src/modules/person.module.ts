import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ValidateIdMiddleware } from 'src/middleware/validation.middleware';
import { Urls } from 'src/utils/const';

import { PersonController } from '../controllers/person.controller';
import { Person, PersonSchema } from '../models/person.model';
import { PersonService } from '../services/person.service';

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
      .forRoutes(Urls.people.GET_BY_ID, Urls.people.UPDATE, Urls.people.DELETE);
  }
}

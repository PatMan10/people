import {
  Controller,
  Get,
  Put,
  Post,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import config, { Env } from 'src/app.config';
import { Urls } from 'src/common/utils/const';
import logger from 'src/common/utils/logger';
import { Person } from './person.model';
import { PersonService } from './person.service';

@Controller()
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Get(Urls.person.GET_ALL)
  getAll(): Promise<Person[]> {
    return this.personService.getAll();
  }

  @Get(Urls.person.GET_BY_ID)
  getById(@Param('id') id: string): Promise<Person> {
    return this.personService.getById(id);
  }

  @Post(Urls.person.ADD)
  add(@Body() person: Person): Promise<Person> {
    logger.debug('person to add => ', person);
    return this.personService.add(person);
  }

  @Put(Urls.person.UPDATE)
  update(@Body() person: Person): Promise<Person> {
    logger.debug('person to update => ', person);
    return this.personService.update(person);
  }

  @Delete(Urls.person.UPDATE)
  delete(@Param('id') id: string): Promise<Person> {
    logger.debug('person id to delete => ', id);
    return this.personService.delete(id);
  }
}

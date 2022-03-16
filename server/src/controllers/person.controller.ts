import {
  Controller,
  Get,
  Put,
  Post,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { Urls } from 'src/utils/const';
import logger from 'src/utils/logger';
import { Person } from '../models/person.model';
import { PersonService } from '../services/person.service';

@Controller()
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Get(Urls.people.GET_ALL)
  async getAll(): Promise<Person[]> {
    return await this.personService.getAll();
  }

  @Get(Urls.people.GET_BY_ID)
  async getById(@Param('id') id: string): Promise<Person> {
    return await this.personService.getById(id);
  }

  @Post(Urls.people.ADD)
  async add(@Body() person: Person): Promise<Person> {
    logger.debug('person to add => ', person);
    return this.personService.add(person);
  }

  @Put(Urls.people.UPDATE)
  async update(@Body() person: Person): Promise<Person> {
    logger.debug('person to update => ', person);
    return this.personService.update(person);
  }

  @Delete(Urls.people.UPDATE)
  async delete(@Param('id') id: string): Promise<Person> {
    logger.debug('person id to delete => ', id);
    return this.personService.delete(id);
  }
}

import {
  Controller,
  Get,
  Put,
  Post,
  Delete,
  Param,
  Body,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';

import { Messages, Urls } from '../common/utils/const';
import logger from '../common/utils/logger';
import { Person } from './person.model';
import { PersonService } from './person.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller()
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Get(Urls.person.GET_ALL)
  getAll(): Promise<Person[]> {
    // 200: return people
    return this.personService.getAll();
  }

  @Get(Urls.person.GET_BY_ID)
  async getById(@Param('id') id: string): Promise<Person> {
    // 400: invalid id

    const person = await this.personService.getById(id);

    // 404: not found
    if (!person) throw new NotFoundException(Messages.fail.NOT_FOUND);

    // 200: return person
    return person;
  }

  @Post(Urls.person.ADD)
  @UseGuards(AuthGuard)
  add(@Body() person: Person): Promise<Person> {
    // 400: invalid payload
    logger.debug('person to add => ', person);

    // 200: return saved person
    return this.personService.add(person);
  }

  @Put(Urls.person.UPDATE)
  @UseGuards(AuthGuard)
  async update(@Body() person: Person): Promise<Person> {
    // 400: invalid id
    // 400: invalid payload
    logger.debug('person to update => ', person);

    const updatedPerson = await this.personService.update(person);

    // 404: not found
    if (!updatedPerson) throw new NotFoundException(Messages.fail.NOT_FOUND);

    // 200: return updated person
    return updatedPerson;
  }

  @Delete(Urls.person.DELETE)
  @UseGuards(AuthGuard)
  async delete(@Param('id') id: string): Promise<Person> {
    // 400: invalid id
    logger.debug('person id to delete => ', id);

    const deletedPerson = await this.personService.delete(id);

    // 404: not found
    if (!deletedPerson) throw new NotFoundException(Messages.fail.NOT_FOUND);

    // 200: return deleted person
    return deletedPerson;
  }
}

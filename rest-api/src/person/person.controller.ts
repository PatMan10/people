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
  Query,
  Session,
} from '@nestjs/common';

import config, { Env } from '../app/app.config';
import { Messages, Urls } from '../shared/utils/const';
import logger from '../shared/utils/logger';
import { Obj } from '../shared/models/generic.model';
import { Person } from './person.model';
import { PersonService } from './person.service';
import { AuthGuard } from '../auth/auth.guard';
import { GenericQuery, QueryResponse } from '../shared/models/generic.model';

@Controller()
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Get(Urls.person.GET_BY_QUERY)
  @UseGuards(AuthGuard)
  getByQuery(
    @Session() session: Obj<string>,
    @Query() query: any,
  ): Promise<QueryResponse<Person>> {
    // 200: return people
    logger.debug(query);
    const q = query.values ? query : new GenericQuery();
    return this.personService.getByQuery(session.userId, q as GenericQuery);
  }

  @Get(Urls.person.GET_BY_ID)
  @UseGuards(AuthGuard)
  async getById(
    @Session() session: Obj<string>,
    @Param('id') id: string,
  ): Promise<Person> {
    // 400: invalid id

    const person = await this.personService.getById(session.userId, id);

    // 404: not found
    if (!person) throw new NotFoundException(Messages.fail.NOT_FOUND);

    // 200: return person
    return person;
  }

  @Post(Urls.person.ADD)
  @UseGuards(AuthGuard)
  add(
    @Session() session: Obj<string>,
    @Body() person: Person,
  ): Promise<Person> {
    // 400: invalid payload
    logger.debug('person to add => ', person);

    if (config.ENV !== Env.TEST) (person as Obj).creator = session.userId;

    // 200: return saved person
    return this.personService.add(person);
  }

  @Put(Urls.person.UPDATE)
  @UseGuards(AuthGuard)
  async update(
    @Param('id') id: string,
    @Body() person: Person,
  ): Promise<Person> {
    // 400: invalid id
    // 400: invalid payload
    logger.debug('person to update => ', person);

    const updatedPerson = await this.personService.update(id, person);

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

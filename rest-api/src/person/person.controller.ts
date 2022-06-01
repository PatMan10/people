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
} from '@nestjs/common';

import config, { Env } from '../app/app.config';
import { Messages, Urls } from '../shared/utils/const';
import logger from '../shared/utils/logger';
import { Obj } from '../shared/models/generic.model';
import { Person } from './person.model';
import { PersonService } from './person.service';
import { AuthGuard } from '../auth/auth.guard';
import { EntityQuery } from '../shared/models/generic.model';
import { GetByQueryDto } from '../shared/models/http.model';
import { User } from '../user/user.decorators';
import { GetUserDto } from '../user/user.model';

@Controller()
@UseGuards(AuthGuard)
export class PersonController {
  constructor(private readonly people: PersonService) {}

  @Get(Urls.person.GET_BY_QUERY)
  getByQuery(
    @User() user: GetUserDto,
    @Query() query: any,
  ): Promise<GetByQueryDto<Person>> {
    // 200: return people
    const q = query.values ? query : new EntityQuery();
    return this.people.getByQuery(user._id.toString(), q as EntityQuery);
  }

  @Get(Urls.person.GET_BY_ID)
  async getById(
    @User() user: GetUserDto,
    @Param('id') id: string,
  ): Promise<Person> {
    // 400: invalid id

    const person = await this.people.getById(user._id.toString(), id);

    // 404: not found
    if (!person) throw new NotFoundException(Messages.fail.NOT_FOUND);

    // 200: return person
    return person;
  }

  @Post(Urls.person.ADD)
  add(@User() user: GetUserDto, @Body() person: Person): Promise<Person> {
    // 400: invalid payload
    logger.debug('person to add => ', person);

    if (config.ENV !== Env.TEST) (person as Obj).creator = user._id;

    // 200: return saved person
    return this.people.add(person);
  }

  @Put(Urls.person.UPDATE)
  async update(
    @Param('id') id: string,
    @Body() person: Person,
  ): Promise<Person> {
    // 400: invalid id
    // 400: invalid payload
    logger.debug('person to update => ', person);

    const updatedPerson = await this.people.update(id, person);

    // 404: not found
    if (!updatedPerson) throw new NotFoundException(Messages.fail.NOT_FOUND);

    // 200: return updated person
    return updatedPerson;
  }

  @Delete(Urls.person.DELETE)
  async delete(@Param('id') id: string): Promise<Person> {
    // 400: invalid id
    logger.debug('person id to delete => ', id);

    const deletedPerson = await this.people.delete(id);

    // 404: not found
    if (!deletedPerson) throw new NotFoundException(Messages.fail.NOT_FOUND);

    // 200: return deleted person
    return deletedPerson;
  }
}

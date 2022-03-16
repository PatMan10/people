import {
  Controller,
  Get,
  Put,
  Post,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
//import { Urls } from 'src/common/utils/const';
//import logger from 'src/common/utils/logger';
import { Person } from './person.model';
import { PersonService } from './person.service';

@Controller()
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Get('/people')
  getAll(): Promise<Person[]> {
    return this.personService.getAll();
  }

  @Get('/people/:id')
  getById(@Param('id') id: string): Promise<Person> {
    return this.personService.getById(id);
  }

  @Post('/people')
  add(@Body() person: Person): Promise<Person> {
    //logger.debug('person to add => ', person);
    return this.personService.add(person);
  }

  @Put('/people:id')
  update(@Body() person: Person): Promise<Person> {
    //logger.debug('person to update => ', person);
    return this.personService.update(person);
  }

  @Delete('people:id')
  delete(@Param('id') id: string): Promise<Person> {
    //logger.debug('person id to delete => ', id);
    return this.personService.delete(id);
  }
}

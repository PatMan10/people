import { Test } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';

import {
  createDBTestModule,
  closeDBConnection,
} from '../shared/utils//mock-db-module';
import { PersonController } from './person.controller';
import { PersonService } from './person.service';
import { Person, PersonSchema } from './person.model';
import { eminem, people } from './person.seed';
import { clone } from '../shared/models/generic.model';

describe('PersonController', () => {
  let controller: PersonController;
  let service: PersonService;

  afterAll(async () => {
    await closeDBConnection();
  });

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [
        createDBTestModule(),
        MongooseModule.forFeature([
          { name: Person.name, schema: PersonSchema },
        ]),
      ],
      controllers: [PersonController],
      providers: [PersonService],
    }).compile();

    service = module.get<PersonService>(PersonService);
    controller = module.get<PersonController>(PersonController);
  });

  it('controller should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAll', () => {
    it('should return an array of people', async () => {
      const result = Promise.resolve(people.slice(0));
      jest.spyOn(service, 'getByQuery').mockImplementation(() => result);
      const expected = await result;
      expected.pop();
      const actual = await controller.getByQuery();

      expect(expected).toBe(actual);
    });
  });

  describe('getById', () => {
    it('should return a person', async () => {
      const result = Promise.resolve(eminem);
      jest.spyOn(service, 'getById').mockImplementation(() => result);
      const expected = await result;
      const actual = await controller.getById(eminem._id.toString());

      expect(expected).toBe(actual);
    });
  });

  describe('add', () => {
    it('should return added person', async () => {
      const result = Promise.resolve(eminem);
      jest.spyOn(service, 'add').mockImplementation(() => result);
      const expected = await result;
      const actual = await controller.add(eminem);

      expect(expected).toBe(actual);
    });
  });

  describe('update', () => {
    it('should return updated person', async () => {
      const emClone = clone(eminem);
      emClone.birthday = '2000-01-01';
      const result = Promise.resolve(emClone);
      jest.spyOn(service, 'update').mockImplementation(() => result);
      const expected = await result;
      const actual = await controller.update(eminem);

      expect(expected.birthday).toBe(actual.birthday);
    });
  });

  describe('delete', () => {
    it('should return deleted person', async () => {
      const emClone = clone(eminem);
      emClone.birthday = '2000-01-01';
      const result = Promise.resolve(emClone);
      jest.spyOn(service, 'delete').mockImplementation(() => result);
      const expected = await result;
      const actual = await controller.delete(eminem._id.toString());

      expect(expected).toBe(actual);
    });
  });
});

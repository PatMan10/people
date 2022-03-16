import { Test } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';

import {
  createDBTestModule,
  closeDBConnection,
} from '../common/utils//mock-db-module';
import { PersonController } from './person.controller';
import { PersonService } from './person.service';
import { Person, PersonSchema } from './person.model';
import { eminem, people } from './person.seed';

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
      jest.spyOn(service, 'getAll').mockImplementation(() => result);
      const expected = await result;
      expected.pop();
      const actual = await controller.getAll();

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
});

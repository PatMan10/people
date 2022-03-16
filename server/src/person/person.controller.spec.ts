import { Test } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';

import { PersonController } from './person.controller';
import { PersonService } from './person.service';
import { Person, PersonSchema } from './person.model';
import { people } from './person.seed';

describe('PersonController', () => {
  let personController: PersonController;
  let personService: PersonService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        MongooseModule.forFeature([
          { name: Person.name, schema: PersonSchema },
        ]),
      ],
      controllers: [PersonController],
      providers: [PersonService],
    }).compile();

    personService = moduleRef.get<PersonService>(PersonService);
    personController = moduleRef.get<PersonController>(PersonController);
  });

  describe('getAll', () => {
    it('should return an array of people', async () => {
      const result = Promise.resolve(people.slice(0));
      jest.spyOn(personService, 'getAll').mockImplementation(() => result);

      expect(await personController.getAll()).toBe(result);
    });
  });
});

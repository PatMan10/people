import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

import {
  id,
  ObjectId,
  EntityQuery,
  arrToRegex,
  Page,
  Obj,
} from '../shared/models/generic.model';
import { Person } from './person.model';
import logger from '../shared/utils/logger';
import { GetByQueryDto } from '../shared/models/http.model';

@Injectable()
export class PersonService {
  constructor(
    @InjectModel(Person.name)
    private readonly PersonModel: Model<Person>,
  ) {}

  async getByQuery(
    userId: string,
    query = new EntityQuery(),
  ): Promise<GetByQueryDto<Person>> {
    const { values, sort, page } = query;
    const filter: Obj = arrToRegex(values);

    filter.creator = userId;

    const [totalPeople, filteredPeople] = await Promise.all([
      this.PersonModel.find(filter).count().exec(),
      this.PersonModel.find(filter)
        .sort(sort)
        .skip((page.number - 1) * page.limit)
        .limit(page.limit)
        .exec(),
    ]);

    const totalPages =
      totalPeople >= page.limit ? Math.ceil(totalPeople / page.limit) : 1;
    const pageRes = new Page(page.number, page.limit, totalPages);

    return new GetByQueryDto(filteredPeople, pageRes);
  }

  getById(userId: string, _id: string): Promise<Person> {
    const filter: Obj = { _id };

    filter.creator = userId;

    return this.PersonModel.findOne(filter).exec();
  }

  add(person: Person): Promise<Person> {
    (person as Obj)._id = id();

    return new this.PersonModel(person).save();
  }

  update(id: string, person: Person): Promise<Person> {
    return this.PersonModel.findByIdAndUpdate(id, person, {
      new: true,
    }).exec();
  }

  delete(id: string | ObjectId): Promise<Person> {
    return this.PersonModel.findByIdAndDelete(id).exec();
  }
}

import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

import {
  id,
  ObjectId,
  GenericQuery,
  regex,
  PageResponse,
  QueryResponse,
} from '../shared/models/generic.model';
import { Person } from './person.model';
import logger from '../shared/utils/logger';

@Injectable()
export class PersonService {
  constructor(
    @InjectModel(Person.name)
    private readonly PersonModel: Model<Person>,
  ) {}

  async getByQuery(
    userId: string,
    query = new GenericQuery(),
  ): Promise<QueryResponse<Person>> {
    const { values, sort, page } = query;
    const v = { ...regex(values), creator: userId };
    const [totalPeople, filteredPeople] = await Promise.all([
      this.PersonModel.find(v).count().exec(),
      this.PersonModel.find(v)
        .sort(sort)
        .skip((page.number - 1) * page.limit)
        .limit(page.limit)
        .exec(),
    ]);
    const totalPages =
      totalPeople >= page.limit ? Math.ceil(totalPeople / page.limit) : 1;
    const pageRes = new PageResponse(page.number, page.limit, totalPages);
    return new QueryResponse(filteredPeople, pageRes);
  }

  getById(userId: string, _id: string | ObjectId): Promise<Person> {
    return this.PersonModel.findOne({ _id, creator: userId }).exec();
  }

  add(person: Person): Promise<Person> {
    (person as any)._id = id();

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

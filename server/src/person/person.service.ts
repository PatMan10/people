import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

import { id, ObjectId } from '../common/models/generic.model';
import { Person, CreatePersonDto, UpdatePersonDto } from './person.model';
import logger from '../common/utils/logger';

@Injectable()
export class PersonService {
  constructor(
    @InjectModel(Person.name)
    private readonly PersonModel: Model<Person>,
  ) {}

  getAll(): Promise<Person[]> {
    return this.PersonModel.find().exec();
  }

  getById(id: string | ObjectId): Promise<Person> {
    return this.PersonModel.findById(id).exec();
  }

  add(person: CreatePersonDto): Promise<Person> {
    (person as any)._id = id();

    return new this.PersonModel(person).save();
  }

  update(id: string, person: UpdatePersonDto): Promise<Person> {
    return this.PersonModel.findByIdAndUpdate(id, person, {
      new: true,
    }).exec();
  }

  delete(id: string | ObjectId): Promise<Person> {
    return this.PersonModel.findByIdAndDelete(id).exec();
  }
}

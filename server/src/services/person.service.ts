import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

import { ObjectId } from 'src/models/generic.model';
import { Person } from '../models/person.model';

@Injectable({})
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

  add(person: Person): Promise<Person> {
    return new this.PersonModel(person).save();
  }

  update(person: Person): Promise<Person> {
    return this.PersonModel.findByIdAndUpdate(person._id, person, {
      new: true,
    }).exec();
  }

  delete(id: string | ObjectId): Promise<Person> {
    return this.PersonModel.findByIdAndDelete(id).exec();
  }
}

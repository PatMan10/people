import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model, Connection, ConnectionStates } from 'mongoose';

import { ObjectId } from 'src/common/models/generic.model';
import { Person } from './person.model';
//import logger from 'src/common/utils/logger';
//import { people } from 'src/person/person.seed';

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

  //  private async seed(): Promise<void> {
  //    if (this.dbCon.readyState !== ConnectionStates.connected) {
  //      //logger.verbose("Can't seed people, DB not connected.");
  //      return;
  //    }
  //
  //    //logger.verbose('adding new dummy data');
  //    await Promise.all(people.map((p) => new this.PersonModel(p).save()));
  //  }
  //
  //  private async clear(): Promise<void> {
  //    if (this.dbCon.readyState !== ConnectionStates.connected) {
  //      //logger.verbose("Can't clear people, DB not connected.");
  //      return;
  //    }
  //
  //    //logger.verbose('clearing db');
  //    await this.PersonModel.deleteMany();
  //  }
}
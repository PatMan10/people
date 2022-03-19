import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

import { validId, id, ObjectId } from '../common/models/generic.model';
import { User } from './user.model';
import logger from '../common/utils/logger';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly UserModel: Model<User>,
  ) {}

  getById(id: string | ObjectId): Promise<User> {
    return this.UserModel.findById(id).exec();
  }

  add(user: User): Promise<User> {
    logger.debug(`valid id ${user._id} => `, validId(user._id));
    if (!validId(user._id)) (user as any)._id = id();

    return new this.UserModel(user).save();
  }

  update(user: User): Promise<User> {
    return this.UserModel.findByIdAndUpdate(user._id, user, {
      new: true,
    }).exec();
  }

  delete(id: string | ObjectId): Promise<User> {
    return this.UserModel.findByIdAndDelete(id).exec();
  }
}

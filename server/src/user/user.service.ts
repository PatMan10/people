import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

import { validId, id, ObjectId } from '../common/models/generic.model';
import { User, UpdateUserDto } from './user.model';
import { Credentials, hash, compare } from './auth.model';
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

  getByEmail(email: string): Promise<User> {
    return this.UserModel.findOne({ email }).exec();
  }

  getByHandle(handle: string): Promise<User> {
    return this.UserModel.findOne({ handle }).exec();
  }

  async add(user: User): Promise<User> {
    logger.debug(`valid id ${user._id} => `, validId(user._id));
    if (!validId(user._id)) (user as any)._id = id();

    user.password = await hash(user.password);

    const newUser = await new this.UserModel(user).save();
    newUser.password = undefined;
    return newUser;
  }

  update(user: UpdateUserDto): Promise<User> {
    return this.UserModel.findByIdAndUpdate(user._id, user, {
      new: true,
    }).exec();
  }

  delete(id: string | ObjectId): Promise<User> {
    return this.UserModel.findByIdAndDelete(id).exec();
  }

  async duplicateEmail(email: string): Promise<boolean> {
    return (await this.getByEmail(email)) ? true : false;
  }

  async duplicateHandle(handle: string): Promise<boolean> {
    return (await this.getByHandle(handle)) ? true : false;
  }

  async validCredentials(credentials: Credentials): Promise<boolean> {
    const user = await this.UserModel.findOne({
      email: credentials.email,
    }).select('+password');

    if (!user) return false;

    const validPassword = await compare(credentials.password, user.password);
    if (!validPassword) return false;

    return true;
  }
}

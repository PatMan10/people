import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

import { id, ObjectId } from '../common/models/generic.model';
import { User, UserDao, CreateUserDto, UpdateUserDto } from './user.model';
import { Credentials, hash, compare } from '../auth/auth.model';
import logger from '../common/utils/logger';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly UserModel: Model<User>,
  ) {}

  getById(id: string | ObjectId): Promise<UserDao> {
    return this.UserModel.findById(id).exec();
  }

  getByEmail(email: string): Promise<UserDao> {
    return this.UserModel.findOne({ email }).exec();
  }

  getByHandle(handle: string): Promise<UserDao> {
    return this.UserModel.findOne({ handle }).exec();
  }

  async add(user: CreateUserDto): Promise<UserDao> {
    (user as any)._id = id();

    user.password = await hash(user.password);

    const savedUser = await new this.UserModel(user).save();
    savedUser.password = undefined;
    return savedUser;
  }

  update(id: string, user: UpdateUserDto): Promise<UserDao> {
    return this.UserModel.findByIdAndUpdate(id, user, {
      new: true,
    }).exec();
  }

  delete(id: string | ObjectId): Promise<User> {
    return this.UserModel.findByIdAndDelete(id).exec();
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

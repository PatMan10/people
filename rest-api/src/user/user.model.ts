import { ApiProperty, PickType } from '@nestjs/swagger';
import {
  IsString,
  Length as dLength,
  Matches,
  IsEmail,
  IsEnum,
} from 'class-validator';
import { Schema } from 'mongoose';
import {
  GenericConst,
  GenericModel,
  GenericModelDbSchema,
  Length,
  StringConst,
  ObjectId,
} from '../common/models/generic.model';

//####################
// CONSTRAINTS
//####################

export class UserConst extends GenericConst {
  static readonly HANDLE = new StringConst(
    new Length(2, 25),
    UserConst.REGEX.ALPHANUMERIC_SYM,
  );

  static readonly EMAIL = new StringConst(
    new Length(4, 50),
    UserConst.REGEX.FREE,
  );

  static readonly PASSWORD = new StringConst(
    new Length(8, 255),
    UserConst.REGEX.FREE,
  );
}

//####################
// TS MODEL
//####################

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

export class User extends GenericModel {
  @IsString()
  @dLength(UserConst.HANDLE.LENGTH.MIN, UserConst.HANDLE.LENGTH.MAX)
  @Matches(UserConst.HANDLE.REGEX)
  @ApiProperty()
  handle: string;

  @IsEmail()
  @dLength(UserConst.EMAIL.LENGTH.MIN, UserConst.EMAIL.LENGTH.MAX)
  @ApiProperty()
  email: string;

  @IsString()
  @dLength(UserConst.PASSWORD.LENGTH.MIN, UserConst.PASSWORD.LENGTH.MAX)
  @Matches(UserConst.PASSWORD.REGEX)
  @ApiProperty()
  password: string;

  @IsEnum(UserRole)
  @ApiProperty()
  role: UserRole;

  constructor(handle = '', email = '', password = '', role = UserRole.USER) {
    super();
    this.handle = handle;
    this.email = email;
    this.password = password;
    this.role = role;
  }
}

export class GetUserDto extends PickType(User, [
  '_id',
  'handle',
  'email',
  'role',
]) {
  override readonly _id: string | ObjectId;

  constructor(public override handle = '', public override email = '') {
    super();
  }
}

export class CreateUserDto extends PickType(User, [
  'handle',
  'email',
  'password',
]) {
  constructor(
    public override handle = '',
    public override email = '',
    public override password = '',
  ) {
    super();
  }
}

export class UpdateUserDto extends PickType(User, ['handle', 'email']) {
  constructor(public override handle = '', public override email = '') {
    super();
  }
}

//####################
// DB MODEL
//####################

export class UserDbSchema extends GenericModelDbSchema {
  readonly handle = {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: UserConst.HANDLE.LENGTH.MIN,
    maxlength: UserConst.HANDLE.LENGTH.MAX,
    match: UserConst.HANDLE.REGEX,
  };

  readonly email = {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: UserConst.EMAIL.LENGTH.MIN,
    maxlength: UserConst.EMAIL.LENGTH.MAX,
    match: UserConst.EMAIL.REGEX,
  };

  readonly password = {
    type: String,
    required: true,
    trim: true,
    select: false,
    minlength: UserConst.PASSWORD.LENGTH.MIN,
    maxlength: UserConst.PASSWORD.LENGTH.MAX,
    match: UserConst.PASSWORD.REGEX,
  };

  readonly role = {
    type: String,
    enum: UserRole,
    required: true,
    default: UserRole.USER,
  };
}

export const UserSchema = new Schema<User>(new UserDbSchema());

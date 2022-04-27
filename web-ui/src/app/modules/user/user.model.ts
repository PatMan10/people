import {
  IsString,
  Length as dLength,
  Matches,
  IsEmail,
  IsEnum,
} from 'class-validator';

import {
  GenericConst,
  GenericModel,
  Length,
  StringConst,
} from '../shared/models/generic.model';

//####################
// CONSTRAINTS
//####################

export class UserConst extends GenericConst {
  static readonly HANDLE = new StringConst(
    new Length(2, 25),
    UserConst.REGEX.ALPHANUMERIC_SYM
  );

  static readonly EMAIL = new StringConst(
    new Length(4, 50),
    UserConst.REGEX.FREE
  );

  static readonly PASSWORD = new StringConst(
    new Length(8, 255),
    UserConst.REGEX.FREE
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
  handle: string;

  @IsEmail()
  @dLength(UserConst.EMAIL.LENGTH.MIN, UserConst.EMAIL.LENGTH.MAX)
  email: string;

  @IsString()
  @dLength(UserConst.PASSWORD.LENGTH.MIN, UserConst.PASSWORD.LENGTH.MAX)
  @Matches(UserConst.PASSWORD.REGEX)
  password: string;

  @IsEnum(UserRole)
  role: UserRole;

  constructor(
    handle: string = '',
    email: string = '',
    password: string = '',
    role: UserRole = UserRole.USER
  ) {
    super();
    this.handle = handle;
    this.email = email;
    this.password = password;
    this.role = role;
  }
}

export class GetUserDto {
  readonly _id: string = '';

  constructor(
    public handle: string = '',
    public email: string = '',
    public password: string = ''
  ) {}
}

export class CreateUserDto {
  @IsString()
  @dLength(UserConst.HANDLE.LENGTH.MIN, UserConst.HANDLE.LENGTH.MAX)
  @Matches(UserConst.HANDLE.REGEX)
  handle: string;

  @IsEmail()
  @dLength(UserConst.EMAIL.LENGTH.MIN, UserConst.EMAIL.LENGTH.MAX)
  email: string;

  @IsString()
  @dLength(UserConst.PASSWORD.LENGTH.MIN, UserConst.PASSWORD.LENGTH.MAX)
  @Matches(UserConst.PASSWORD.REGEX)
  password: string;

  constructor(handle: string = '', email: string = '', password: string = '') {
    this.handle = handle;
    this.email = email;
    this.password = password;
  }
}

export class UpdateUserDto {
  @IsString()
  @dLength(UserConst.HANDLE.LENGTH.MIN, UserConst.HANDLE.LENGTH.MAX)
  @Matches(UserConst.HANDLE.REGEX)
  handle: string;

  @IsEmail()
  @dLength(UserConst.EMAIL.LENGTH.MIN, UserConst.EMAIL.LENGTH.MAX)
  email: string;

  constructor(handle: string = '', email: string = '') {
    this.handle = handle;
    this.email = email;
  }
}

import {
  GenericConst,
  GenericModel,
  Length,
  StringConst,
} from '../common/models/generic.model';

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
  handle: string;
  email: string;
  password: string;
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
  constructor(
    public handle: string = '',
    public email: string = '',
    public password: string = ''
  ) {}
}

export class UpdateUserDto {
  constructor(public handle: string = '', public email: string = '') {}
}

import { IsString, IsEmail, Length, Matches } from 'class-validator';

import { UserConst } from '../user/user.model';

export class Credentials {
  @IsEmail()
  @Length(UserConst.EMAIL.LENGTH.MIN, UserConst.EMAIL.LENGTH.MAX)
  email: string;

  @IsString()
  @Length(UserConst.PASSWORD.LENGTH.MIN, UserConst.PASSWORD.LENGTH.MAX)
  @Matches(UserConst.PASSWORD.REGEX)
  password: string;

  constructor(email = '', password = '') {
    this.email = email;
    this.password = password;
  }
}

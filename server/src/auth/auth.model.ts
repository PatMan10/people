import { PickType } from '@nestjs/swagger';

import { User } from '../user/user.model';

export class Credentials extends PickType(User, ['email', 'password']) {
  constructor(email: string = '', password: string = '') {
    super();
    this.email = email;
    this.password = password;
  }
}

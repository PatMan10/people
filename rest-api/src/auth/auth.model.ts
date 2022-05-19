import { PickType } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';

import { User } from '../user/user.model';

export const hash = (password: string): Promise<string> =>
  bcrypt.hash(password, 10);

export const compare = (password: string, hash: string): Promise<boolean> =>
  bcrypt.compare(password, hash);

export class Credentials extends PickType(User, ['email', 'password']) {
  constructor(public override email = '', public override password = '') {
    super();
  }
}

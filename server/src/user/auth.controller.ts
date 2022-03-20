import {
  Controller,
  Post,
  Body,
  BadRequestException,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';

import { UserService } from './user.service';
import { User } from './user.model';
import { Credentials } from './auth.model';
import { Messages, Urls } from '../common/utils/const';

@Controller()
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Post(Urls.auth.REGISTER)
  async register(@Body() user: User): Promise<User> {
    // 400: invalid payload

    // 400: duplicate email
    const duplicateEmail = await this.userService.duplicateEmail(user.email);
    if (duplicateEmail)
      throw new BadRequestException(Messages.fail.auth.DUPLICATE_EMAIL);

    // 400: duplicate handle
    const duplicateHandle = await this.userService.duplicateHandle(user.handle);
    if (duplicateHandle)
      throw new BadRequestException(Messages.fail.auth.DUPLICATE_HANDLE);

    // 201: return new user
    return this.userService.add(user);
  }

  @Post(Urls.auth.LOGIN)
  @HttpCode(HttpStatus.OK)
  async login(@Body() credentials: Credentials): Promise<User> {
    // 400: invalid payload

    // 400: invalid credentials
    const validCredentials = await this.userService.validCredentials(
      credentials,
    );
    if (!validCredentials)
      throw new BadRequestException(Messages.fail.auth.INVALID_CREDENTIALS);

    // 200: return user
    return this.userService.getByEmail(credentials.email);
  }
}

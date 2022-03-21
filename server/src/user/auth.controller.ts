import {
  Controller,
  Post,
  Body,
  BadRequestException,
  HttpCode,
  HttpStatus,
  Session,
  Get,
} from '@nestjs/common';

import { UserService } from './user.service';
import { User } from './user.model';
import { Credentials } from './auth.model';
import { Messages, Urls } from '../common/utils/const';

@Controller()
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Get(Urls.auth.WHO_AM_I)
  async whoAmI(@Session() session: Record<string, any>): Promise<User> {
    return this.userService.getById(session.userId);
  }

  @Post(Urls.auth.REGISTER)
  async register(
    @Body() user: User,
    @Session() session: Record<string, any>,
  ): Promise<User> {
    // 400: invalid payload

    // 400: duplicate email
    const duplicateEmail = await this.userService.getByEmail(user.email);
    if (duplicateEmail)
      throw new BadRequestException(Messages.fail.auth.DUPLICATE_EMAIL);

    // 400: duplicate handle
    const duplicateHandle = await this.userService.getByHandle(user.handle);
    if (duplicateHandle)
      throw new BadRequestException(Messages.fail.auth.DUPLICATE_HANDLE);

    const savedUser = await this.userService.add(user);
    session.userId = savedUser._id;

    // 201: return new user
    return savedUser;
  }

  @Post(Urls.auth.LOGIN)
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() credentials: Credentials,
    @Session() session: Record<string, any>,
  ): Promise<User> {
    // 400: invalid payload

    // 400: invalid credentials
    const validCredentials = await this.userService.validCredentials(
      credentials,
    );
    if (!validCredentials)
      throw new BadRequestException(Messages.fail.auth.INVALID_CREDENTIALS);

    const user = await this.userService.getByEmail(credentials.email);
    session.userId = user._id;

    // 200: return user
    return user;
  }

  @Post(Urls.auth.LOGOUT)
  @HttpCode(HttpStatus.OK)
  async logout(@Session() session: Record<string, any>): Promise<void> {
    session.userId = undefined;
    return;
  }
}
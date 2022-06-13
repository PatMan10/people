import {
  Controller,
  Get,
  Put,
  Delete,
  Param,
  Body,
  NotFoundException,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { Messages, Urls } from '../shared/utils/const';
import logger from '../shared/utils/logger';
import { GetUserDto, UpdateUserDto } from './user.model';
import { UserService } from './user.service';
import { AuthGuard } from '../auth/auth.guard';
import { User } from './user.decorators';

@Controller()
@UseGuards(AuthGuard)
export class UserController {
  constructor(private readonly users: UserService) {}

  @Get(Urls.user.GET_BY_ID)
  async getById(@Param('id') id: string): Promise<GetUserDto> {
    // 400: invalid id

    const user = await this.users.getById(id);

    // 404: not found
    if (!user) throw new NotFoundException(Messages.fail.NOT_FOUND);

    // 200: return user
    return user;
  }

  @Put(Urls.user.UPDATE)
  async update(
    @User() user: GetUserDto,
    @Param('id') id: string,
    @Body() payload: UpdateUserDto,
  ): Promise<GetUserDto> {
    // 400: invalid id
    // 400: invalid payload
    logger.debug('user to update => ', payload);

    // 400: duplicate email
    let dbUser = await this.users.getByEmail(payload.email);
    if (
      dbUser &&
      dbUser.email === payload.email &&
      dbUser._id.toString() !== user._id.toString()
    )
      throw new BadRequestException(Messages.fail.auth.DUPLICATE_EMAIL);

    // 400: duplicate handle
    dbUser = await this.users.getByHandle(payload.handle);
    if (
      dbUser &&
      dbUser.handle === payload.handle &&
      dbUser._id.toString() !== user._id.toString()
    )
      throw new BadRequestException(Messages.fail.auth.DUPLICATE_HANDLE);

    const updatedUser = await this.users.update(id, payload);

    // 404: not found
    if (!updatedUser) throw new NotFoundException(Messages.fail.NOT_FOUND);

    // 200: return updated user
    return updatedUser;
  }

  @Delete(Urls.user.DELETE)
  async delete(@Param('id') id: string): Promise<GetUserDto> {
    // 400: invalid id
    logger.debug('user id to delete => ', id);

    const deletedUser = await this.users.delete(id);

    // 404: not found
    if (!deletedUser) throw new NotFoundException(Messages.fail.NOT_FOUND);

    // 200: return deleted user
    return deletedUser;
  }
}

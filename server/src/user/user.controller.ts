import {
  Controller,
  Get,
  Put,
  Delete,
  Param,
  Body,
  NotFoundException,
} from '@nestjs/common';
import { Messages, Urls } from '../common/utils/const';
import logger from '../common/utils/logger';
import { User } from './user.model';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(Urls.user.GET_BY_ID)
  async getById(@Param('id') id: string): Promise<User> {
    // 400: invalid id

    const user = await this.userService.getById(id);

    // 404: not found
    if (!user) throw new NotFoundException(Messages.fail.NOT_FOUND);

    // 200: return user
    return user;
  }

  @Put(Urls.user.UPDATE)
  async update(@Body() user: User): Promise<User> {
    // 400: invalid id
    // 400: invalid payload
    logger.debug('user to update => ', user);

    const updatedUser = await this.userService.update(user);

    // 404: not found
    if (!updatedUser) throw new NotFoundException(Messages.fail.NOT_FOUND);

    // 200: return updated user
    return updatedUser;
  }

  @Delete(Urls.user.DELETE)
  async delete(@Param('id') id: string): Promise<User> {
    // 400: invalid id
    logger.debug('user id to delete => ', id);

    const deletedUser = await this.userService.delete(id);

    // 404: not found
    if (!deletedUser) throw new NotFoundException(Messages.fail.NOT_FOUND);

    // 200: return deleted user
    return deletedUser;
  }
}

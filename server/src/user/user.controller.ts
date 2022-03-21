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
import { Messages, Urls } from '../common/utils/const';
import logger from '../common/utils/logger';
import { User, UpdateUserDto } from './user.model';
import { UserService } from './user.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller()
@UseGuards(AuthGuard)
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
  async update(
    @Param('id') id: string,
    @Body() user: UpdateUserDto,
  ): Promise<User> {
    // 400: invalid id
    // 400: invalid payload
    logger.debug('user to update => ', user);

    // 400: duplicate email
    const duplicateEmail = await this.userService.getByEmail(user.email);
    if (duplicateEmail)
      throw new BadRequestException(Messages.fail.auth.DUPLICATE_EMAIL);

    // 400: duplicate handle
    const duplicateHandle = await this.userService.getByHandle(user.handle);
    if (duplicateHandle)
      throw new BadRequestException(Messages.fail.auth.DUPLICATE_HANDLE);

    const updatedUser = await this.userService.update(id, user);

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

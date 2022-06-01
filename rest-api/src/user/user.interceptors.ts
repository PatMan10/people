import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';

import config, { Env } from '../app/app.config';
import { god } from './user.seed';
import { UserService } from './user.service';

@Injectable()
export class UserInterceptor implements NestInterceptor {
  constructor(private readonly userService: UserService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest();
    const { userId } = req.session || {};

    if (config.ENV === Env.TEST) req.user = god;

    if (userId) req.user = await this.userService.getById(userId);

    return next.handle();
  }
}

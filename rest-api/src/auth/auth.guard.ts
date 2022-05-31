import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

import config from '../app/app.config';
import { validId } from '../shared/models/generic.model';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<Request>();
    const { userId } = req.session;

    return config.REQUIRE_AUTH ? validId(userId) : true;
  }
}

import {
  Injectable,
  NestMiddleware,
  BadRequestException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import { validId } from '../models/generic.model';
import { Messages } from '../utils/const';

@Injectable()
export class ValidateIdMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // 400 invalid id
    if (!validId(req.params.id))
      throw new BadRequestException(Messages.fail.INVALID_ID);

    next();
  }
}

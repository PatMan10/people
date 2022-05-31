import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { plainToClass } from 'class-transformer';

import { ValidationErrorResponse } from '../shared/models/http.model';
import { GenericQuery } from '../shared/models/generic.model';
import { Messages } from '../shared/utils/const';

export const exceptionFactory = (errors: ValidationError[]): void => {
  throw new BadRequestException(
    new ValidationErrorResponse(Messages.fail.INVALID_PAYLOAD, errors),
  );
};

@Injectable()
export class ParseQueryPipe implements PipeTransform {
  transform(value: any, meta: ArgumentMetadata): GenericQuery {
    if (meta.type === 'query' && value && value.q) {
      const q = plainToClass(GenericQuery, JSON.parse(value.q));
      delete q.values._id;
      return q;
    }
    return value;
  }
}

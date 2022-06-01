import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { plainToClass } from 'class-transformer';

import { ValidationErrorDto } from '../shared/models/http.model';
import { EntityQuery } from '../shared/models/generic.model';
import { Messages } from '../shared/utils/const';

export const exceptionFactory = (errors: ValidationError[]): void => {
  throw new BadRequestException(
    new ValidationErrorDto(Messages.fail.INVALID_PAYLOAD, errors),
  );
};

@Injectable()
export class ParseQueryPipe implements PipeTransform {
  transform(value: any, meta: ArgumentMetadata): EntityQuery {
    if (meta.type === 'query' && value && value.q) {
      const q = plainToClass(EntityQuery, JSON.parse(value.q));
      delete q.values._id;
      return q;
    }
    return value;
  }
}

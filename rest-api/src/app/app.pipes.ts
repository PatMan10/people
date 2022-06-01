import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { ValidationError } from 'class-validator';

import { ValidationErrorDto } from '../shared/models/http.model';
import { Messages } from '../shared/utils/const';

export const exceptionFactory = (errors: ValidationError[]): void => {
  throw new BadRequestException(
    new ValidationErrorDto(Messages.fail.INVALID_PAYLOAD, errors),
  );
};

@Injectable()
export class ParseQueryPipe implements PipeTransform {
  transform(value: any, meta: ArgumentMetadata) {
    if (meta.type === 'query')
      if (value.q) return JSON.parse(value.q);
      else return {};

    return value;
  }
}

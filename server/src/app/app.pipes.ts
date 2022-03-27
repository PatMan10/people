import { BadRequestException } from '@nestjs/common';
import { ValidationError } from 'class-validator';

import { ValidationErrorResponse } from '../common/models/http.model';
import { Messages } from '../common/utils/const';

export const exceptionFactory = (errors: ValidationError[]): void => {
  throw new BadRequestException(
    new ValidationErrorResponse(Messages.fail.INVALID_PAYLOAD, errors),
  );
};

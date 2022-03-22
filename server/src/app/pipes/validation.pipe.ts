import { BadRequestException } from '@nestjs/common';
import { ValidationError } from 'class-validator';

import { iValidationError, ValidationErrorResponse } from '../../common/models/http.model';
import { Messages } from '../../common/utils/const';

export const exceptionFactory = (errorsArg: ValidationError[]): void => {
  const errors = errorsArg.map(extractError);
  throw new BadRequestException(
    new ValidationErrorResponse(Messages.fail.INVALID_PAYLOAD, errors),
  );
};

const extractError = (e: ValidationError): iValidationError => {
  const { property, value, constraints } = e;
  const children: iValidationError[] | undefined =
    e.children.length > 0 ? e.children.map(extractError) : undefined;

  return {
    property,
    value,
    constraints,
    children,
  };
};

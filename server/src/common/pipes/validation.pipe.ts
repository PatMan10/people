import { BadRequestException } from '@nestjs/common';
import { ValidationError } from 'class-validator';

import { iValidationError, ValidationException } from '../models/http.model';
import { Messages } from '../utils/const';

export const exceptionFactory = (errorsArg: ValidationError[]): void => {
  const errors = errorsArg.map(extractError);
  throw new BadRequestException(
    new ValidationException(Messages.fail.INVALID_PAYLOAD, errors),
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

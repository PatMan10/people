import { ValidationError } from 'class-validator';

export class ErrorResponse {
  constructor(readonly status: number, readonly message: string) {}
}

export class ValidationErrorResponse extends ErrorResponse {
  constructor(
    status: number,
    message: string,
    readonly details?: ValidationError[]
  ) {
    super(status, message);
  }
}

export function extractErrorMessages(
  propertyArg: string,
  errors: ValidationError[]
): string[] {
  for (let i = 0; i < errors.length; i++) {
    const { property, constraints, children } = errors[i];
    if (propertyArg === property && constraints)
      return Object.values(constraints);

    if (children && children.length > 0)
      return extractErrorMessages(propertyArg, children);
  }

  return [];
}

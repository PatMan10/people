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

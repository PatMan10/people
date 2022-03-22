import { HttpStatus } from '@nestjs/common';

export class ErrorResponse {
  constructor(readonly status: number, readonly message: string) {}
}

export interface iValidationError {
  property: string;
  value: any;
  constraints?: Record<string, string>;
  children?: iValidationError[];
}

export class ValidationErrorResponse extends ErrorResponse {
  constructor(message: string, readonly details?: iValidationError[]) {
    super(HttpStatus.BAD_REQUEST, message);
  }
}

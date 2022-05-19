import { HttpStatusCode } from '@angular/common/http';
import { ValidationError } from 'class-validator';

export class ErrorResponse {
  constructor(readonly status: number, readonly message: string) {}
}

export class ValidationErrorResponse extends ErrorResponse {
  constructor(message: string, readonly details?: ValidationError[]) {
    super(HttpStatusCode.BadRequest, message);
  }
}

import { HttpStatusCode } from '@angular/common/http';
import { ValidationError } from 'class-validator';
import { Page } from './generic.model';

export class ErrorDto {
  constructor(readonly status: number, readonly message: string) {}
}

export class ValidationErrorDto extends ErrorDto {
  constructor(message: string, readonly details?: ValidationError[]) {
    super(HttpStatusCode.BadRequest, message);
  }
}

export class GetByQueryDto<T> {
  constructor(public items: T[], public page: Page) {}
}

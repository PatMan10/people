import { ValidationErrorItem } from './joi.model';

export class Body<T> {
  constructor(readonly payload?: T, readonly error?: Error) {}
}

export class Error {
  constructor(readonly message: string) {}
}

export class ValidationError extends Error {
  constructor(message: string, readonly details: ValidationErrorItem[]) {
    super(message);
  }
}

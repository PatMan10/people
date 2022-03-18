import { HttpStatus } from '@nestjs/common';

export class Exception {
  constructor(readonly status: number, readonly message: string) {}
}

export class ValidationException extends Exception {
  constructor(message: string, readonly details?: Record<string, any>[]) {
    super(HttpStatus.BAD_REQUEST, message);
  }
}

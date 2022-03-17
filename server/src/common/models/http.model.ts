import { HttpStatus } from '@nestjs/common';

export class Error {
  constructor(readonly status: number, readonly message: string) {}
}

export class ValidationError extends Error {
  constructor(message: string, readonly details?: Record<string, any>[]) {
    super(HttpStatus.BAD_REQUEST, message);
  }
}

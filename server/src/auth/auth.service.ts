import { Injectable } from '@nestjs/common';

@Injectable({})
export class AuthService {
  register(): string {
    return 'You are registered.';
  }

  login(): string {
    return 'You are logged in.';
  }
}

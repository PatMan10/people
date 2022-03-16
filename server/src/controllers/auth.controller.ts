import { Controller, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';

@Controller({
  path: 'auth',
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(): string {
    const payload = this.authService.register();
    return payload;
  }

  @Post('login')
  login(): string {
    const payload = this.authService.login();
    return payload;
  }
}

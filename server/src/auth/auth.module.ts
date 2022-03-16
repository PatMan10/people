import {
  MiddlewareConsumer,
  Module,
  NestModule,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Injectable()
export class RegisterMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Register Middleware');
    next();
  }
}

@Injectable()
export class LoginMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Login Middleware');
    next();
  }
}

@Module({
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RegisterMiddleware).forRoutes('auth/register');
    consumer.apply(LoginMiddleware).forRoutes('auth/login');
  }
}

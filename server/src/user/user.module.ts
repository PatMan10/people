import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_INTERCEPTOR } from '@nestjs/core';

import { ValidateIdMiddleware } from '../common/middleware/validation.middleware';
import { Urls } from '../common/utils/const';
import { UserController } from './user.controller';
import { User, UserSchema } from './user.model';
import { UserService } from './user.service';
import { CurrentUserInterceptor } from './user.interceptor';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CurrentUserInterceptor,
    },
  ],
  exports: [UserService],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ValidateIdMiddleware)
      .forRoutes(Urls.user.GET_BY_ID, Urls.user.UPDATE, Urls.user.DELETE);
  }
}

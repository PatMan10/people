import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ValidateIdMiddleware } from '../common/middleware/validation.middleware';
import { Urls } from '../common/utils/const';
import { AuthController } from './auth.controller';
import { UserController } from './user.controller';
import { User, UserSchema } from './user.model';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [AuthController, UserController],
  providers: [UserService],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ValidateIdMiddleware)
      .forRoutes(Urls.user.GET_BY_ID, Urls.user.UPDATE, Urls.user.DELETE);
  }
}

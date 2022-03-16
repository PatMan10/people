import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import config from './app.config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PersonModule } from './person/person.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    MongooseModule.forRoot(config.DB_URI),
    AuthModule,
    UserModule,
    PersonModule,
  ],
  controllers: [AppController],
})
export class AppModule {}

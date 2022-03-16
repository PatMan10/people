import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import config from './app.config';
import { AuthModule } from './modules/auth.module';
import { UserModule } from './modules/user.module';
import { PersonModule } from './modules/person.module';
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

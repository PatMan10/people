import { DynamicModule } from '@nestjs/common';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongod: MongoMemoryServer;

export const createDBTestModule = async (
  options: MongooseModuleOptions = {},
): Promise<DynamicModule> => {
  mongod = await MongoMemoryServer.create();
  return MongooseModule.forRoot(mongod.getUri(), options);
};

export const closeDBConnection = async (): Promise<void> => {
  if (mongod) await mongod.stop();
};

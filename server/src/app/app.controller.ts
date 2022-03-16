import { Controller, Get } from '@nestjs/common';
//import { Urls, Messages } from '../common/utils/const';

@Controller()
export class AppController {
  @Get('/')
  index(): string {
    return 'Welcome to the people rest API.';
  }
}

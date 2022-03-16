import { Controller, Get, HttpStatus } from '@nestjs/common';
import { Urls, Messages } from './utils/const';

@Controller()
export class AppController {
  @Get(Urls.INDEX)
  index() {
    return { status: HttpStatus.OK, message: Messages.success.WELCOME };
  }
}

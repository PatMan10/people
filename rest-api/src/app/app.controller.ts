import { Controller, Get } from '@nestjs/common';
import { Urls, Messages } from '../shared/utils/const';

@Controller()
export class AppController {
  @Get(Urls.INDEX)
  index() {
    return { message: Messages.success.WELCOME };
  }
}

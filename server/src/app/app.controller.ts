import { Controller, Get } from '@nestjs/common';
import { Urls, Messages } from '../common/utils/const';

@Controller()
export class AppController {
  @Get(Urls.INDEX)
  index(): string {
    return Messages.success.WELCOME;
  }
}

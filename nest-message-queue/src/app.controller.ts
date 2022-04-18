import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('queue')
  addMessage(@Body('data') data: number) {
    return this.appService.addMessageQueue(data);
  }
}

import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { MessageSubscriber } from './message.subscriber';

@Module({
  controllers: [MessageController],
  providers: [MessageService, MessageSubscriber],
})
export class MessageModule {}

import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

@Injectable()
export class AppService {
  constructor(@InjectQueue('messageQueue') private messageQueue: Queue) {}

  async addMessageQueue(data: number) {
    const job = await this.messageQueue.add('task', {
      dataId: data,
    });
    return job;
  }

  getHello(): string {
    return 'Hello World!';
  }
}

import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';

@Processor('messageQueue')
export class AppConsumer {
  private readonly logger = new Logger(AppConsumer.name);

  @Process('task')
  getMessageQueue(job: Job) {
    this.logger.log(`${job.data.dataId} 번 작업을 수신했습니다ㅣ.`);
  }
}

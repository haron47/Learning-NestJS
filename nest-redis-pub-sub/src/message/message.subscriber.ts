import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { createClient } from 'redis';

@Injectable()
export class MessageSubscriber implements OnApplicationBootstrap {
  onApplicationBootstrap() {
    // 메일 삭제 푸시 알림 작동
    this.subscribeMessage();
  }

  async subscribeMessage() {
    const subscriber = createClient({ host: 'localhost', port: 6379 });
    subscriber.subscribe('hocaron_channel');
    subscriber.on('message', (channel, message) => {
      const data = JSON.parse(message);
      console.log(data.name);
      console.log(data.job);
    });
    return;
  }
}

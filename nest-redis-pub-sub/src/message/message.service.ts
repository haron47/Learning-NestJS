import { Injectable } from '@nestjs/common';
import { createClient } from 'redis';

@Injectable()
export class MessageService {
  publish() {
    const pub = createClient({
      host: 'localhost',
      port: 6379,
    });

    const message = "{ name: 'hocaron', job: 'backend-developer'};";
    pub.publish('hocaron_channel', message);
  }
}

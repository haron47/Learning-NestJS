import { Get, Injectable } from '@nestjs/common';
import { get } from 'http';
import { userInfo } from 'os';

@Injectable()
export class AppService {
  async getUser() {
    return process.env.SECRETE;
  }
}

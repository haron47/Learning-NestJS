import { Injectable, HttpStatus, HttpException } from '@nestjs/common';

@Injectable()
export class AppService {
  sendError(): string {
    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
  }
}

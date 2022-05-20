import { Injectable, Inject } from '@nestjs/common';
import { Logger as WinstonLogger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

@Injectable()
export class AppService {
  constructor(@Inject(WINSTON_MODULE_PROVIDER) private readonly logger: WinstonLogger,
  ) { }

  async createLog(): Promise<void> {
    console.log(this.logger.name);

    let data  = "data is";

    this.logger.error('error: ', "hi");
    this.logger.warn('warn: ', data);
    this.logger.info('info: ', data);
    this.logger.http('http: ', data);
    this.logger.verbose('verbose: ', data);
    this.logger.debug('debug: ', data);
    this.logger.silly('silly: ', data);
  }
}

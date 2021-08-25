import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { Router } from 'express';
import { ROUTES } from '@nestjs/core/router/router-module';
import { UsersModule } from './users/users.module';
import { DmsService } from './dms/dms.service';
import { DmsController } from './dms/dms.controller';
import { ChannelsController } from './channels/channels.controller';
import { ChannelsService } from './channels/channels.service';
import { WorkspacesService } from './workspaces/workspaces.service';
import { WorkspacesController } from './workspaces/workspaces.controller';

@Module({
  imports: [ConfigModule.forRoot(), UsersModule],
  controllers: [AppController, DmsController, ChannelsController, WorkspacesController],
  providers: [AppService, DmsService, ChannelsService, WorkspacesService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}

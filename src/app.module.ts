import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { UsersModule } from './users/users.module';
import { DmsService } from './dms/dms.service';
import { DmsController } from './dms/dms.controller';
import { ChannelsController } from './channels/channels.controller';
import { ChannelsService } from './channels/channels.service';
import { WorkspacesService } from './workspaces/workspaces.service';
import { WorkspacesController } from './workspaces/workspaces.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/Users';
import { AuthModule } from './auth/auth.module';
import { WorkspacesModule } from './workspaces/workspaces.module';
import { ChannelsModule } from './channels/channels.module';
import { EventsModule } from './events/events.module';
import { EventsGateway } from './events.gateway';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    TypeOrmModule.forRoot(),
    AuthModule,
    UsersModule,
    WorkspacesModule,
    ChannelsModule,
    EventsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}

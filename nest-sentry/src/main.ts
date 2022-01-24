import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as Sentry from '@sentry/node';
import { SentryInterceptor } from './common/sentry.interceptor';
import { WebhookInterceptor } from './common/webhook.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
  });
  app.useGlobalInterceptors(new SentryInterceptor());
  app.useGlobalInterceptors(new WebhookInterceptor());
  await app.listen(3000);
}
bootstrap();

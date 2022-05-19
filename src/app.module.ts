import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { TopicsModule } from './topics/topics.module';
import { NewsModule } from './news/news.module';
import { RedisModule } from './redis/redis.module';

@Module({
  imports: [
    // dev = .development.env
    // prod = .production.env
    // staging = .staging.env
    ConfigModule.forRoot({
      envFilePath: '.production.env',
    }),
    PrismaModule,
    TopicsModule,
    NewsModule,
    RedisModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

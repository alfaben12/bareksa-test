import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { TopicsModule } from 'src/topics/topics.module';
import { RedisModule } from 'src/redis/redis.module';

@Module({
  imports: [TopicsModule, RedisModule],
  controllers: [NewsController],
  providers: [NewsService],
})
export class NewsModule { }

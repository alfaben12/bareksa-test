import { Module } from '@nestjs/common';
import { TopicsService } from './topics.service';
import { TopicsController } from './topics.controller';
import { NewsService } from 'src/news/news.service';

@Module({
  controllers: [TopicsController],
  providers: [TopicsService],
  exports: [TopicsService]
})
export class TopicsModule { }

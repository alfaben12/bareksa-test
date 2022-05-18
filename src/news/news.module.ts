import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { TopicsModule } from 'src/topics/topics.module';

@Module({
  imports: [TopicsModule],
  controllers: [NewsController],
  providers: [NewsService],
})
export class NewsModule { }

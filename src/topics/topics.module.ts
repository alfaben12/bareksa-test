import { Module } from '@nestjs/common';
import { TopicsService } from './topics.service';
import { TopicsController } from './topics.controller';
import { RedisModule } from 'src/redis/redis.module';

@Module({
  imports: [RedisModule],
  controllers: [TopicsController],
  providers: [TopicsService],
  exports: [TopicsService]
})
export class TopicsModule { }

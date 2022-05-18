import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RedisService } from 'src/redis/redis.service';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';
import { TopicEntity } from './entities/topic.entity';

const redisKeyPrefix = "topic"
@Injectable()
export class TopicsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly redisService: RedisService
  ) { }

  async create(createTopicDto: CreateTopicDto): Promise<TopicEntity> {
    const redisKey = `${redisKeyPrefix}:all`
    const cache = await this.redisService.get(redisKey)
    if (cache) {
      await this.redisService.del(redisKey)
    }

    return this.prismaService.topic.create({
      data: createTopicDto
    })
  }

  async findAll(): Promise<TopicEntity[]> {
    const redisKey = `${redisKeyPrefix}:all`
    const cache = await this.redisService.get(redisKey)
    if (cache) {
      return JSON.parse(cache)
    }

    const results = await this.prismaService.topic.findMany({
      include: {
        news: true
      }
    })

    await this.redisService.set(redisKey, JSON.stringify(results))
    return results
  }

  async findOne(id: number): Promise<TopicEntity> {
    const redisKey = `${redisKeyPrefix}:${id}`
    const cache = await this.redisService.get(redisKey)
    if (cache) {
      return JSON.parse(cache)
    }

    const result = await this.prismaService.topic.findUnique({
      where: {
        id
      },
      include: {
        news: true
      }
    })

    await this.redisService.set(redisKey, JSON.stringify(result))
    return result
  }

  async update(id: number, updateTopicDto: UpdateTopicDto): Promise<TopicEntity> {
    const redisKey = `${redisKeyPrefix}:all`
    const cache = await this.redisService.get(redisKey)
    if (cache) {
      await this.redisService.del(redisKey)
    }

    return this.prismaService.topic.update({
      where: {
        id
      },
      data: updateTopicDto
    })
  }

  async remove(id: number): Promise<TopicEntity> {
    const redisKey = `${redisKeyPrefix}:${id}`
    const cache = await this.redisService.get(redisKey)
    if (cache) {
      await this.redisService.del(redisKey)
    }

    return this.prismaService.topic.delete({
      where: {
        id
      },
    })
  }
}

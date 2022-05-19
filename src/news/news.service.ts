import { Injectable } from '@nestjs/common';
import { NewsStatus } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { RedisService } from 'src/redis/redis.service';
import { TopicEntity } from 'src/topics/entities/topic.entity';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { NewsEntity } from './entities/news.entity';

const redisKeyPrefix = "news"
@Injectable()
export class NewsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly redisService: RedisService
  ) { }

  async create(createNewsDto: CreateNewsDto): Promise<TopicEntity> {
    const redisKey = `${redisKeyPrefix}:all*`
    await this.redisService.delWithPrefix(redisKey)

    return this.prismaService.news.create({
      data: {
        topicId: +createNewsDto.topicId,
        title: createNewsDto.title,
        body: createNewsDto.body,
        image: createNewsDto.image,
        tags: createNewsDto.tags,
        status: createNewsDto.status,
      }
    })
  }

  async findAll(q: string): Promise<NewsEntity[]> {
    let redisKey = `${redisKeyPrefix}:all:${q}` // if empty = news:all:undefined
    const cache = await this.redisService.get(redisKey)
    if (cache) {
      return JSON.parse(cache)
    }

    let where = {}
    if ([NewsStatus.deleted, NewsStatus.draft, NewsStatus.publish].includes(q as NewsStatus)) {
      where = {
        status: q
      }
    } else {
      if (q) {
        where["topic"] = {
          title: {
            contains: q,
            mode: "insensitive"
          }
        }
      }
    }

    const results = await this.prismaService.news.findMany({
      include: {
        topic: true
      },
      where
    })

    await this.redisService.set(redisKey, JSON.stringify(results))
    return results
  }

  async findOne(id: number): Promise<NewsEntity> {
    const redisKey = `${redisKeyPrefix}:${id}`
    const cache = await this.redisService.get(redisKey)
    if (cache) {
      return JSON.parse(cache)
    }

    const result = await this.prismaService.news.findUnique({
      where: {
        id
      },
      include: {
        topic: true
      }
    })

    await this.redisService.set(redisKey, JSON.stringify(result))
    return result
  }

  async update(id: number, updateNewsDto: UpdateNewsDto): Promise<NewsEntity> {
    const redisKey = `${redisKeyPrefix}:all*`
    await this.redisService.delWithPrefix(redisKey)

    return this.prismaService.news.update({
      where: {
        id
      },
      data: {
        topicId: +updateNewsDto.topicId,
        title: updateNewsDto.title,
        body: updateNewsDto.body,
        image: updateNewsDto.image,
        tags: updateNewsDto.tags,
        status: updateNewsDto.status,
      }
    })
  }

  async remove(id: number): Promise<NewsEntity> {
    const redisKey = `${redisKeyPrefix}:${id}`
    const cache = await this.redisService.get(redisKey)
    if (cache) {
      await this.redisService.del(redisKey)
    }

    return this.prismaService.news.delete({
      where: {
        id
      },
    })
  }
}

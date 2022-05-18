import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TopicEntity } from 'src/topics/entities/topic.entity';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { NewsEntity } from './entities/news.entity';

@Injectable()
export class NewsService {
  constructor(
    private readonly prismaService: PrismaService
  ) { }

  create(createNewsDto: CreateNewsDto): Promise<TopicEntity> {
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

  findAll(): Promise<NewsEntity[]> {
    return this.prismaService.news.findMany({
      include: {
        topic: true
      }
    })
  }

  findOne(id: number): Promise<NewsEntity> {
    return this.prismaService.news.findUnique({
      where: {
        id
      },
      include: {
        topic: true
      }
    })
  }

  update(id: number, updateNewsDto: UpdateNewsDto): Promise<NewsEntity> {
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

  remove(id: number): Promise<NewsEntity> {
    return this.prismaService.news.delete({
      where: {
        id
      },
    })
  }
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';
import { TopicEntity } from './entities/topic.entity';

@Injectable()
export class TopicsService {
  constructor(
    private readonly prismaService: PrismaService
  ) { }

  async create(createTopicDto: CreateTopicDto): Promise<TopicEntity> {
    return this.prismaService.topic.create({
      data: createTopicDto
    })
  }

  findAll(): Promise<TopicEntity[]> {
    return this.prismaService.topic.findMany({
      include: {
        news: true
      }
    })
  }

  findOne(id: number): Promise<TopicEntity> {
    return this.prismaService.topic.findUnique({
      where: {
        id
      },
      include: {
        news: true
      }
    })
  }

  update(id: number, updateTopicDto: UpdateTopicDto): Promise<TopicEntity> {
    return this.prismaService.topic.update({
      where: {
        id
      },
      data: updateTopicDto
    })
  }

  remove(id: number): Promise<TopicEntity> {
    return this.prismaService.topic.delete({
      where: {
        id
      },
    })
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete, Put, HttpException, HttpStatus } from '@nestjs/common';
import { TopicsService } from './topics.service';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';

@Controller({ path: 'topics', version: '1' })
export class TopicsController {
  constructor(private readonly topicsService: TopicsService) { }

  @Post()
  async create(@Body() createTopicDto: CreateTopicDto) {
    return this.topicsService.create(createTopicDto);
  }

  @Get()
  findAll() {
    return this.topicsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const result = await this.topicsService.findOne(+id);
    if (!result) {
      return new HttpException("Topic not available", HttpStatus.NOT_FOUND)
    }

    return result
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateTopicsDto: UpdateTopicDto) {
    const result = await this.topicsService.findOne(+id);
    if (!result) {
      return new HttpException("Topic not available", HttpStatus.NOT_FOUND)
    }

    return this.topicsService.update(+id, updateTopicsDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const result = await this.topicsService.findOne(+id);
    if (!result) {
      return new HttpException(" not available", HttpStatus.NOT_FOUND)
    }

    return this.topicsService.remove(+id);
  }
}

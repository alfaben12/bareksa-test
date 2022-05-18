import { Controller, Get, Post, Body, Patch, Param, Delete, Put, HttpCode, HttpStatus, HttpException } from '@nestjs/common';
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { TopicsService } from 'src/topics/topics.service';
import { NewsStatus } from '@prisma/client';

@Controller({ path: 'news', version: '1' })
export class NewsController {
  constructor(private readonly newsService: NewsService, private readonly topicsService: TopicsService) { }

  @Post()
  async create(@Body() createNewsDto: CreateNewsDto) {
    const validationTopic = await this.topicsService.findOne(+createNewsDto.topicId)
    if (!validationTopic) {
      return new HttpException("Topic not available", HttpStatus.NOT_FOUND)
    }

    if (![NewsStatus.deleted, NewsStatus.draft, NewsStatus.publish].includes(createNewsDto.status)) {
      return new HttpException("Invalid Status", HttpStatus.BAD_REQUEST)
    }

    return await this.newsService.create(createNewsDto);
  }

  @Get()
  findAll() {
    return this.newsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const result = await this.newsService.findOne(+id);
    if (!result) {
      return new HttpException("News not available", HttpStatus.NOT_FOUND)
    }

    return result
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateNewsDto: UpdateNewsDto) {
    const result = await this.newsService.findOne(+id);
    if (!result) {
      return new HttpException("News not available", HttpStatus.NOT_FOUND)
    }

    return this.newsService.update(+id, updateNewsDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const result = await this.newsService.findOne(+id);
    if (!result) {
      return new HttpException("News not available", HttpStatus.NOT_FOUND)
    }

    return this.newsService.remove(+id);
  }
}

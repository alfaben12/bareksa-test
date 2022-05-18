import { HttpException } from '@nestjs/common';
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { TopicsService } from 'src/topics/topics.service';
export declare class NewsController {
    private readonly newsService;
    private readonly topicsService;
    constructor(newsService: NewsService, topicsService: TopicsService);
    create(createNewsDto: CreateNewsDto): Promise<import("../topics/entities/topic.entity").TopicEntity | HttpException>;
    findAll(): Promise<import("./entities/news.entity").NewsEntity[]>;
    findOne(id: string): Promise<HttpException | import("./entities/news.entity").NewsEntity>;
    update(id: string, updateNewsDto: UpdateNewsDto): Promise<HttpException | import("./entities/news.entity").NewsEntity>;
    remove(id: string): Promise<HttpException | import("./entities/news.entity").NewsEntity>;
}

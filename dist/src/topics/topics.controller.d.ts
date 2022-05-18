import { HttpException } from '@nestjs/common';
import { TopicsService } from './topics.service';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';
export declare class TopicsController {
    private readonly topicsService;
    constructor(topicsService: TopicsService);
    create(createTopicDto: CreateTopicDto): Promise<import("./entities/topic.entity").TopicEntity>;
    findAll(): Promise<import("./entities/topic.entity").TopicEntity[]>;
    findOne(id: string): Promise<import("./entities/topic.entity").TopicEntity | HttpException>;
    update(id: string, updateTopicsDto: UpdateTopicDto): Promise<import("./entities/topic.entity").TopicEntity | HttpException>;
    remove(id: string): Promise<import("./entities/topic.entity").TopicEntity | HttpException>;
}

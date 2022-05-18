import { PrismaService } from 'src/prisma/prisma.service';
import { RedisService } from 'src/redis/redis.service';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';
import { TopicEntity } from './entities/topic.entity';
export declare class TopicsService {
    private readonly prismaService;
    private readonly redisService;
    constructor(prismaService: PrismaService, redisService: RedisService);
    create(createTopicDto: CreateTopicDto): Promise<TopicEntity>;
    findAll(): Promise<TopicEntity[]>;
    findOne(id: number): Promise<TopicEntity>;
    update(id: number, updateTopicDto: UpdateTopicDto): Promise<TopicEntity>;
    remove(id: number): Promise<TopicEntity>;
}

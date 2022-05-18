import { PrismaService } from 'src/prisma/prisma.service';
import { TopicEntity } from 'src/topics/entities/topic.entity';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { NewsEntity } from './entities/news.entity';
export declare class NewsService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    create(createNewsDto: CreateNewsDto): Promise<TopicEntity>;
    findAll(): Promise<NewsEntity[]>;
    findOne(id: number): Promise<NewsEntity>;
    update(id: number, updateNewsDto: UpdateNewsDto): Promise<NewsEntity>;
    remove(id: number): Promise<NewsEntity>;
}

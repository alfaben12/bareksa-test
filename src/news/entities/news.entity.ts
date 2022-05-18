import { NewsStatus, News } from "@prisma/client"; // from prisma schema
import { TopicEntity } from "src/topics/entities/topic.entity";

export class NewsEntity implements News {
    id: number;
    topicId: number;
    title: string;
    body: string;
    image: string;
    tags: string[];
    status: NewsStatus;
    createdAt: Date;
    updatedAt: Date;
    topic?: TopicEntity
}

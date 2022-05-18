import { NewsStatus, News } from "@prisma/client"; // from prisma schema

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
    news?: News
}

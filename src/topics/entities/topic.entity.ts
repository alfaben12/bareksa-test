import { News, Topic } from "@prisma/client";

export class TopicEntity implements Topic {
    id: number;
    title: string;
    body: string;
    createdAt: Date;
    updatedAt: Date;
    news?: News[]
}

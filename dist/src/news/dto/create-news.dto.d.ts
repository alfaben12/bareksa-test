import { NewsStatus } from "@prisma/client";
export declare class CreateNewsDto {
    topicId: string;
    title: string;
    body: string;
    image: string;
    tags: string[];
    status: NewsStatus;
}

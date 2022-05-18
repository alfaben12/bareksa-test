import { ApiProperty } from "@nestjs/swagger";
import { NewsStatus } from "@prisma/client"; // from prisma schema
import { IsNotEmpty } from "class-validator";

export class CreateNewsDto {
    @ApiProperty({
        required: true
    })
    @IsNotEmpty()
    topicId: string;

    @ApiProperty({
        required: true
    })
    @IsNotEmpty()
    title: string;

    @ApiProperty({
        required: true
    })
    @IsNotEmpty()
    body: string;

    @ApiProperty({
        required: true
    })
    @IsNotEmpty()
    image: string;

    @ApiProperty({
        required: true
    })
    @IsNotEmpty()
    tags: string[];

    @ApiProperty({
        required: true
    })
    @IsNotEmpty()
    status: NewsStatus;
}

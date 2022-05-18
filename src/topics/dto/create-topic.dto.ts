import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateTopicDto {
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
}

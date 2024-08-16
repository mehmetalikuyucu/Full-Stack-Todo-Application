import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateTaskDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly title: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    readonly description: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly userId:string;
}

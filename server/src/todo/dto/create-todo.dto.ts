import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateTodoDto {

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
    readonly userId:number;
}

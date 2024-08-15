import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateTodoDto } from './create-todo.dto';
import { TodoStatusType } from '../entities/enums/todoStatusType.enum';
import { IsEnum, IsOptional } from 'class-validator';

export class UpdateTodoDto extends PartialType(CreateTodoDto) {
    @IsEnum(TodoStatusType)
    @IsOptional()
    @ApiProperty()
    readonly status?:TodoStatusType
}

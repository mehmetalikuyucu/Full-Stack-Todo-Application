import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateTaskDto } from './create-task.dto';
import { TaskStatusType } from '../entities/enums/task-status-type.enum';
import { IsEnum, IsOptional } from 'class-validator';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
    @IsEnum(TaskStatusType)
    @IsOptional()
    @ApiProperty()
    readonly status?:TaskStatusType
}

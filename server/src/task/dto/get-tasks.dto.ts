import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, Min } from 'class-validator';

export class GetTasksDto {
  @ApiPropertyOptional({ type: Number, default: 1 })
  @IsOptional()
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @IsInt()
  @Min(1)
  @ApiPropertyOptional({ type: Number, default: 10 })
  limit?: number = 10;

  @ApiPropertyOptional()
  sortBy?: string;

  @ApiPropertyOptional()
  sortOrder?: 'ASC' | 'DESC' = 'ASC';

  @ApiPropertyOptional()
  title?: string;

  @ApiPropertyOptional()
  status?: string;

  @ApiPropertyOptional()
  userId?: string;
}

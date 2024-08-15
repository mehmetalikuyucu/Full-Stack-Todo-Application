import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  Res,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-tasks.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetTasksDto } from './dto/get-tasks.dto';
import { PaginatedResponse } from 'src/dto/paginated-response.dto';
import { Task } from './entities/task.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiResponse } from 'src/dto/api-response.dto';
import { ResponseMessageType } from 'src/dto/enums/response-messageType.enum';

@Controller('task')
@ApiTags('Task Resource')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class TaskController{
  constructor(private readonly taskService: TaskService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(createTaskDto);
  }

  @Get()
  async findAll(@Query() getTasksDto:GetTasksDto):Promise<PaginatedResponse<Task>> {
    const {data,total} = await this.taskService.findAll(getTasksDto);
   return new PaginatedResponse(data,total,getTasksDto.page,getTasksDto.limit,);
  }

  @Get(':id')
  async findOne(@Param('id') id: string):Promise<ApiResponse<Task>>{
     return new ApiResponse(await this.taskService.findOne(id),ResponseMessageType.SUCCESS);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskService.remove(id);
  }
}

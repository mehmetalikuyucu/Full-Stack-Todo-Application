import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-tasks.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { GetTasksDto } from './dto/get-tasks.dto';
import { Console } from 'console';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const newTask = this.taskRepository.create(createTaskDto);
    return await this.taskRepository.save(newTask);
  }

  async findAll(
    getTasksDto: GetTasksDto,
  ): Promise<{ data: Task[]; total: number }> {
    const {
      page = 1,
      limit = 10,
      sortBy,
      sortOrder,
      title,
      status,
      userId,
    } = getTasksDto;
    const query = this.taskRepository.createQueryBuilder('task');
    if (title) {
      query.andWhere('task.title like :title', { title: `%${title}%` });
    }
    if (status) {
      query.andWhere('task.status = :status', { status });
    }
    if (sortBy) {
      query.orderBy(`task.${sortBy}`, sortOrder);
    }
    if (userId) {
      query.andWhere('task.userId = :userId', { userId });
    }
    const [data, total] = await query
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();
    return { data, total };
  }

  async findOne(id: string): Promise<Task> {
    return await this.taskRepository.findOne({ where: { id } });
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const taskToUpdate = await this.taskRepository.findOne({ where: { id } });
    if (!taskToUpdate) {
      throw new Error(`Task with id ${id} not found`);
    }
    const updatedTask = Object.assign(taskToUpdate, updateTaskDto);
    return await this.taskRepository.save(updatedTask);
  }

  async remove(id: string): Promise<void> {
    const taskToRemove = await this.taskRepository.findOne({ where: { id } });
    if (!taskToRemove) {
      throw new Error(`Task with id ${id} not found`);
    }
    await this.taskRepository.remove(taskToRemove);
  }
}

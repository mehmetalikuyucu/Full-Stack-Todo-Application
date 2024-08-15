import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TodoService {
  
  constructor(@InjectRepository(Todo) private todoRepository:Repository<Todo>) {}

  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    const newTodo = this.todoRepository.create(createTodoDto);
    return await this.todoRepository.save(newTodo);
  }

  async findAll(): Promise<Todo[]> {
    return await this.todoRepository.find();
  }

  async findOne(id: number): Promise<Todo> {
    return await this.todoRepository.findOne({ where: { id } });
  }

  async update(id: number, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    const todoToUpdate = await this.todoRepository.findOne({ where: { id } });
    if (!todoToUpdate) {
      throw new Error(`Todo with id ${id} not found`);
    }
    const updatedTodo = Object.assign(todoToUpdate, updateTodoDto);
    return await this.todoRepository.save(updatedTodo);
  }

  async remove(id: number): Promise<void> {
    const todoToRemove = await this.todoRepository.findOne({ where: { id } });
    if (!todoToRemove) {
      throw new Error(`Todo with id ${id} not found`);
    }
    await this.todoRepository.remove(todoToRemove);
  }
}

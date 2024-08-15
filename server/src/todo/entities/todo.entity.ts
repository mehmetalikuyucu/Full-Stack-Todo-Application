import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TodoStatusType } from './enums/todoStatusType.enum';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: number;
  @Column({ type: 'text' })
  @ApiProperty()
  title: string;
  @Column({ type: 'text' })
  @ApiProperty()
  description: string;
  @Column({
    type: 'enum',
    enum: TodoStatusType,
    default: TodoStatusType.PENDING,
  })
  @ApiProperty()
  status: TodoStatusType;
  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;
  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;
  @ApiProperty()
  @ManyToOne(() => User, (user) => user.todos)
  user: User;
}

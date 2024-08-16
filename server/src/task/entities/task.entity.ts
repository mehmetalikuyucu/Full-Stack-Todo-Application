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
import { TaskStatusType } from './enums/task-status-type.enum';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  @Column({ type: 'text' })
  @ApiProperty()
  title: string;
  @Column({ type: 'text' })
  @ApiProperty()
  description: string;

  @Column({
    type: 'enum',
    enum: TaskStatusType,
    default: TaskStatusType.PENDING,
  })
  @ApiProperty()
  status: TaskStatusType;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: 'uuid' })
  @ApiProperty()
  userId: string;

  @ApiProperty()
  @ManyToOne(() => User, (user) => user.tasks)
  user: User;
}

import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserRoleTypes } from './enums/userRoleTypes.enum';
import { IsEmail } from 'class-validator';
import { Task } from 'src/task/entities/task.entity';

@Entity()
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({ type: 'varchar', unique: true, length: 50 })
  username: string;

  @ApiProperty()
  @Column({ type: 'varchar', unique: true, length: 320 })
  @IsEmail()
  email: string;

  @ApiProperty()
  @Column({ type: 'text' })
  password: string;

  @ApiProperty()
  @Column({ type: 'enum', enum: UserRoleTypes, default: UserRoleTypes.USER })
  role: UserRoleTypes;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty()
  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];
}

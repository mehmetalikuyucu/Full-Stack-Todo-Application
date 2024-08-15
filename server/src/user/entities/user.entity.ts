import { ApiProperty } from '@nestjs/swagger';
import { Todo } from 'src/todo/entities/todo.entity';
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

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;

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
  @OneToMany(() => Todo, (todo) => todo.user)
  accessTokens: string[];

  @ApiProperty()
  @OneToMany(() => Todo, (todo) => todo.user)
  todos: Todo[];
}

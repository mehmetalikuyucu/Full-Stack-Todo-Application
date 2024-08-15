import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepository:Repository<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create({...createUserDto,password: await this.hashPassword(createUserDto.password)});
    return this.userRepository.save(user); 
  }

  async findAll():Promise<User[]> {
    return this.userRepository.find();
  }

  async findOneByUsername(username: string): Promise<User> {
    const user = await this.userRepository.findOne({where: {username}});
    if (!user) {
      throw new Error(`User with username ${username} not found`);
    }
    return user;
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne({where: {id}});
    if (!user) {
      throw new Error(`User with id ${id} not found`);
    }
    return user;
  }
  //TODO: don't forget to hash the password before updating
  async update(id: string, updateUserDto: UpdateUserDto):Promise<User> {
    const user = await this.userRepository.findOne({where: {id}});
    if (!user) {
      throw new Error(`User with id ${id} not found`);
    }
    Object.assign(user, updateUserDto);
    return this.userRepository.save(user);
  }
//TODO: change only user Status Type not remove user
  async remove(id: string) {
    const user = await this.userRepository.findOne({where: {id}});
    if (!user) {
      throw new Error(`User with id ${id} not found`);
    }
    return this.userRepository.remove(user);
  }
  
  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }
  async comparePassword(plainTextPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainTextPassword, hashedPassword);
  }
}

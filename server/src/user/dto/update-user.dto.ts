import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { UserRoleTypes } from '../entities/enums/userRoleTypes.enum';
import { IsEnum, IsOptional } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsEnum(UserRoleTypes)
    @IsOptional()
    @ApiProperty()
    readonly role?:UserRoleTypes
}

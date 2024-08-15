import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { SigninDto } from './dto/signin.dto';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) {}

    async signIn(signinDto: SigninDto): Promise<{ access_token: string }> {
        const user = await this.userService.findOneByUsername(signinDto.username);
        if (!user) {
            throw new Error('User not found');
        }
        const passwordMatch = await bcrypt.compare(signinDto.password, user.password);
        if (!passwordMatch) {
            throw new Error('Invalid credentials');
        }
        const access_token = this.jwtService.sign({ username: user.username, sub: user.id });
        return { access_token };
    }

    async signUp(signupDto: CreateUserDto) {
        const user = await this.userService.create(signupDto);
        return user;
    }
}


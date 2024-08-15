import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { SigninDto } from './dto/signin.dto';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from './entities/auth.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService,@InjectRepository(Auth) private authRepository:Repository<Auth>) {}

        //TODO: add dto for signIn
    

    //TODO: return error message if user not found or password is incorrect
    //TODO add Global Generic Response 

    async signIn(signinDto: SigninDto): Promise<{ access_token: string }> {
        const user = await this.userService.findOneByUsername(signinDto.username);
        if (!user) {
            return null;
        }

        const passwordMatch = await bcrypt.compare(signinDto.password, user.password);
        if (!passwordMatch) {
            return null;
        }

        const payload = { username: user.username, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}

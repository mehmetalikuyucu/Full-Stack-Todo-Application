import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { SigninDto } from './dto/signin.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@ApiTags('Auth Resource')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('signin')
    async signIn(@Body() signinDto: SigninDto) {
        return this.authService.signIn(signinDto);
    }

    @Post('signup')
    async signUp(@Body() signupDto: CreateUserDto) {
        return this.authService.signUp(signupDto);
    }
}

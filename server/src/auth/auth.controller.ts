import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { SigninDto } from './dto/signin.dto';

@ApiTags('Auth Resource')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('signin')
    async signIn(@Body() signinDto: SigninDto) {
        return this.authService.signIn(signinDto);
    }
}

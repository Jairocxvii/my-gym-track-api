import { Controller, Post, Body } from '@nestjs/common';

import { AuthService } from '../../application/services/auth.service';
import { LoginDto } from 'src/auth/application/dto/login.dto';
import { RefreshDto } from 'src/auth/application/dto/refresh.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly AuthService: AuthService) {}

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.AuthService.login(loginDto.email, loginDto.password);
  }

  @Post('refresh')
  refreshToken(@Body() refreshTokenDto: RefreshDto) {
    return this.AuthService.refresh(refreshTokenDto);
  }
}

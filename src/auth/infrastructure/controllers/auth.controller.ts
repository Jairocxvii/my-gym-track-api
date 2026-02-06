import { Controller, Post, Body } from '@nestjs/common';

import { AuthService } from '../../application/services/auth.service';
import { LoginDto } from 'src/auth/application/dto/login.dto';
import { RefreshDto } from 'src/auth/application/dto/refresh.dto';
import { TokenDto } from 'src/auth/application/dto/token.dto';
import { RecoveryPasswordDto } from 'src/auth/application/dto/recovery-password.dto';
import { UpdatePasswordDto } from 'src/auth/application/dto/update-password.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly AuthService: AuthService) { }

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.AuthService.login(loginDto.email, loginDto.password);
  }

  @Post('refresh')
  refreshToken(@Body() refreshTokenDto: RefreshDto) {
    return this.AuthService.refresh(refreshTokenDto);
  }

  @Post('verify')
  verifyToken(@Body() tokenDto: TokenDto) {
    return this.AuthService.verifyToken(tokenDto.token);
  }

  @Post('recovery')
  recoveryPassword(@Body() recoveryDto: RecoveryPasswordDto) {
    return this.AuthService.recoveryPassword(recoveryDto);
  }

  @Post('verify-recovery')
  verifyRecovery(@Body() recoveryDto: RecoveryPasswordDto) {
    return this.AuthService.verifyRecovery(recoveryDto);
  }


  @Post('update-password')
  updatePassword(@Body() updatePasswordDto: UpdatePasswordDto) {
    return this.AuthService.updatePassword(updatePasswordDto.token, updatePasswordDto.newPassword);
  }


}

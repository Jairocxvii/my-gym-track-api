import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';

import { Payload } from '../interfaces/payload.interface';

import { HasherPort, HASHER_PORT } from '@common/domain/ports/hasher.port';
import { RefreshDto } from '../dto/refresh.dto';
import { TokenServicesPort } from 'src/auth/domain/ports/token-services.port';
import { AuthUsuarioRepositoryPort } from 'src/auth/domain/ports/auth-usuario-repository.port';
import { RecoveryPasswordDto } from '../dto/recovery-password.dto';
import { UsuarioEntity } from 'src/usuario/domain/entities/usuario.entity';

@Injectable()
export class AuthService {
  constructor(
    private authUsuarioRepositoryPort: AuthUsuarioRepositoryPort,
    @Inject(HASHER_PORT)
    private hasherService: HasherPort,
    private tokenServices: TokenServicesPort,
  ) { }

  async login(email: string, password: string) {
    const usuario = await this.authUsuarioRepositoryPort.findByEmail(email);

    if (!usuario) throw new UnauthorizedException('Invalid credentials');
    if (!usuario.isActivo) throw new UnauthorizedException('User inactive');

    const isValid = await this.hasherService.compare(password, usuario.passwordHash);
    if (!isValid) throw new UnauthorizedException('Invalid credentials');
    const payload: Payload = {
      id: usuario.id.toString(),
      email: usuario.email,
      name: usuario.nombre,
      role: usuario.rol,
    };
    const token = this.tokenServices.generateToken(payload);
    const refreshToken = this.tokenServices.generateRefreshToken(payload);
    this.authUsuarioRepositoryPort.updateRefreshToken(usuario.id, refreshToken);
    return { token, refreshToken };
  }
  async refresh(refreshToken: RefreshDto) {
    try {
      const payload = this.tokenServices.verifyRefreshToken(refreshToken.refresh_token);
      if (!payload) throw new UnauthorizedException('Invalid refresh token');
      const usuario = await this.authUsuarioRepositoryPort.findOne(parseInt(payload.id));
      // TO DO VAlidar refresh token con BD

      if (!usuario) throw new UnauthorizedException('Invalid refresh token');
      if (!usuario.isActivo)
        throw new UnauthorizedException('User inactive');

      //TO DO

      const usuarioPayload: Payload = {
        id: usuario.id.toString(),
        email: usuario.email,
        name: usuario.nombre,
        role: usuario.rol,
      };
      const token = this.tokenServices.generateToken(usuarioPayload);
      const newRefreshToken = this.tokenServices.generateRefreshToken(usuarioPayload);
      this.authUsuarioRepositoryPort.updateRefreshToken(usuario.id, newRefreshToken);
      return { token, newRefreshToken };
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
  async verifyToken(token: string) {
    try {
      const payload = this.tokenServices.verifyToken(token);
      if (!payload) throw new UnauthorizedException('Invalid token');
      /*const usuario = await this.authUsuarioRepositoryPort.findOne(parseInt(payload.id));
      if (!usuario) throw new UnauthorizedException('Invalid token');
      if (!usuario.isActivo)
        throw new UnauthorizedException('User inactive');*/
      return true;
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException('Invalid token');
    }
  }
  async recoveryPassword(recoveryDto: RecoveryPasswordDto) {
    let usuario: UsuarioEntity | null = null;
    if (recoveryDto.type === 'email') {
      usuario = await this.authUsuarioRepositoryPort.findByEmail(recoveryDto.data);
    }
    if (recoveryDto.type === 'phone') {
      usuario = await this.authUsuarioRepositoryPort.findByPhone(recoveryDto.data);
    }
    if (usuario) {
      // TODO ENVIAR CORREO O SMS O WhatsApp

      this.authUsuarioRepositoryPort.updateRecoveryCode(usuario.id, "CODIGO-PRUEBA");

    }
    return {
      ok: true,
      message: 'Recovery password sent'
    }


  }
  async verifyRecovery(recoveryDto: RecoveryPasswordDto) {
    let usuario: UsuarioEntity | null = null;
    if (recoveryDto.type === 'email') {
      usuario = await this.authUsuarioRepositoryPort.findByEmail(recoveryDto.data);
    }
    if (recoveryDto.type === 'phone') {
      usuario = await this.authUsuarioRepositoryPort.findByPhone(recoveryDto.data);
    }
    if (usuario && usuario.codigoRecuperacion == recoveryDto.code) {
      const payload: Payload = {
        id: usuario.id.toString(),
        email: usuario.email,
        name: usuario.nombre,
        role: usuario.rol,
      };
      const token = this.tokenServices.generateToken(payload);
      const refreshToken = this.tokenServices.generateRefreshToken(payload);
      this.authUsuarioRepositoryPort.updateRefreshToken(usuario.id, refreshToken);
      return { token, refreshToken };
    }
    return {
      ok: true,
      message: 'ok'
    }



  }
  async updatePassword(token: string, newPassword: string) {
    try {
      const payload = this.tokenServices.verifyToken(token);
      if (!payload) throw new UnauthorizedException('Invalid token');
      const usuario = await this.authUsuarioRepositoryPort.findOne(parseInt(payload.id));
      if (!usuario) throw new UnauthorizedException('Invalid token');
      if (!usuario.isActivo)
        throw new UnauthorizedException('User inactive');
      usuario.passwordHash = await this.hasherService.hash(newPassword);
      await this.authUsuarioRepositoryPort.updatePassword(usuario.id, usuario.passwordHash);
      return {
        ok: true,
        message: 'Password updated'
      }
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException('Invalid token');
    }
  }
}

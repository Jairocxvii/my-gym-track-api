import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Payload } from '../../application/interfaces/payload.interface';
import { AuthUsuarioRepositoryPort } from 'src/auth/domain/ports/auth-usuario-repository.port';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private authUsuarioRepositoryPort: AuthUsuarioRepositoryPort
  ) {
    const secret = configService.get<string>('JWT_SECRET');
    if (!secret) {
      throw new Error('JWT_SECRET is missing');
    }
    super({
      secretOrKey: secret,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: Payload): Promise<any> {
    const { id } = payload;
    const user = await this.authUsuarioRepositoryPort.findOne(+id);
    if (!user) throw new UnauthorizedException('Token not valid');
    if (!user.isActivo)
      throw new UnauthorizedException('User is inactive, talk with an admin');

    return user;
  }
}

import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { Injectable, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TokenServicesPort } from '../../domain/ports/token-services.port';
import { Payload } from 'src/auth/application/interfaces/payload.interface';

@Injectable()
export class TokenServicesAdapter implements TokenServicesPort {
  private readonly defaultAccessTokenExpiry: string;
  private readonly defaultRefreshTokenExpiry: string;
  private readonly accessTokenSecret: string;
  private readonly refreshTokenSecret: string;

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.defaultAccessTokenExpiry = this.configService.get('JWT_EXPIRES') || '30m';
    this.defaultRefreshTokenExpiry = this.configService.get('JWT_REFRESH_EXPIRES') || '4d';
    this.accessTokenSecret = this.validateSecret(this.configService.get<string>('JWT_SECRET') || '', 'JWT_SECRET');
    this.refreshTokenSecret = this.validateSecret(this.configService.get<string>('JWT_REFRESH_SECRET') || '', 'JWT_REFRESH_SECRET');
  }

  generateToken(payload: Payload): string {
    return this.generateJwt(payload, {
      expiresIn: this.defaultAccessTokenExpiry as any,
      secret: this.accessTokenSecret,
    });
  }

  verifyToken(token: string): Payload {
    return this.verifyJwt(token, this.accessTokenSecret);
  }

  generateRefreshToken(payload: Payload): string {
    return this.generateJwt(payload, {
      expiresIn: this.defaultRefreshTokenExpiry as any,
      secret: this.refreshTokenSecret,
    });
  }

  verifyRefreshToken(token: string): Payload {
    return this.verifyJwt(token, this.refreshTokenSecret);
  }

  private generateJwt(payload: Payload, options: JwtSignOptions): string {
    try {
      return this.jwtService.sign(payload, options);
    } catch (error) {
      throw new BadRequestException('Error generating JWT token');
    }
  }

  private verifyJwt(token: string, secret: string): Payload {
    try {
      return this.jwtService.verify(token, { secret });
    } catch (error) {
      throw new BadRequestException('Invalid or expired token');
    }
  }

  private validateSecret(secret: string | undefined, name: string): string {
    if (!secret) {
      throw new Error(`Missing required environment variable: ${name}`);
    }
    return secret;
  }
}

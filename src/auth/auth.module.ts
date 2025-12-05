import { forwardRef, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './infrastructure/strategies/jwt.strategy';
import { AuthController } from './infrastructure/controllers/auth.controller';
import { AuthService } from './application/services/auth.service';
import { CommonModule } from '@common/common.module';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { TokenServicesAdapter } from './infrastructure/adapters/token-services.adapter';
import { TokenServicesPort } from './domain/ports/token-services.port';

@Module({
  imports: [
    CommonModule,
    forwardRef(() => UsuarioModule),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: '15m',
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    JwtStrategy,
    AuthService,
    {
      provide: TokenServicesPort,
      useClass: TokenServicesAdapter,
    },
  ],
  exports: [PassportModule, JwtModule],
})
export class AuthModule { }

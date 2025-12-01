import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    return {
      secret: configService.get('JWT_SECRET'),
      signOptions: {
        expiresIn: '2h',
      },
    };
  },

})
export class AuthModule { }

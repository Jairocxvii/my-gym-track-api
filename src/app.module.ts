import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { CommonModule } from './common/common.module';
@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }), TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,

    // Entidades generadas a partir de la BD
    entities: [__dirname + '/**/*.entity.{ts,js}'],

    synchronize: false,   // No tocar la BD existente
    autoLoadEntities: true,
  }), UserModule, CommonModule,],
  controllers: [],
  providers: [],
})
export class AppModule { }

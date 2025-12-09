import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsuarioModule } from './usuario/usuario.module';
import { CommonModule } from './common/common.module';
import { EjercicioModule } from './ejercicio/ejercicio.module';
import { RutinasModule } from './rutinas/rutinas.module';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [
    // 1. Configuración global
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    // 2. Módulo común (incluye DatabaseModule)
    CommonModule,

    // 3. Módulos de dominio
    UsuarioModule,
    EjercicioModule,
    RutinasModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

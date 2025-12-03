import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioService } from './application/services/usuario.service';
import { ProgresoService } from './application/services/progreso.service';
import { UsuarioController } from './infrastructure/controllers/usuario.controller';
import { USUARIO_PORT } from './domain/ports/usuario.port';
import { UsuarioAdapter } from './infrastructure/adapters/usuario.adapter';
import { Usuario } from './infrastructure/database/entities/usuario';
import { Preferencia } from './infrastructure/database/entities/preferencia';
import { Progreso } from './infrastructure/database/entities/progreso';
import { PROGRESO_PORT } from './domain/ports/progreso.port';
import { ProgresoAdapter } from './infrastructure/adapters/progreso.adapter';
import { CommonModule } from '@common/common.module';
import { AuthModule } from 'src/auth/auth.module';
@Module({
  imports: [CommonModule,
    AuthModule, TypeOrmModule.forFeature([Usuario, Preferencia, Progreso])],
  controllers: [UsuarioController],
  providers: [
    {
      provide: USUARIO_PORT,
      useClass: UsuarioAdapter,
    },
    {
      provide: PROGRESO_PORT,
      useClass: ProgresoAdapter,
    },
    UsuarioService,
    ProgresoService
  ],
  exports: [UsuarioService]
})
export class UsuarioModule { }



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
import { AuthUsuarioRepositoryPort } from '../auth/domain/ports/auth-usuario-repository.port';
import { Objetivo } from './infrastructure/database/entities/objetivo';
import { Actividad } from './infrastructure/database/entities/actividad';
import { TipoObjetivo } from './infrastructure/database/entities/tipo-objetivo';
import { UnidadMedida } from './infrastructure/database/entities/unidad-medida';
import { ObjetivoController } from './infrastructure/controllers/objetivo.controller';
import { ObjetivoService } from './application/services/objetivo.service';
import { ObjetivoAdapter } from './infrastructure/adapters/objetivo.adapter';
import { OBJETIVO_PORT } from './domain/ports/objetivo.port';

@Module({
  imports: [CommonModule,
    TypeOrmModule.forFeature([Usuario, Preferencia, Progreso, Objetivo, Actividad, TipoObjetivo, UnidadMedida])],
  controllers: [UsuarioController, ObjetivoController],
  providers: [
    UsuarioAdapter,
    {
      provide: USUARIO_PORT,
      useExisting: UsuarioAdapter,
    },
    {
      provide: AuthUsuarioRepositoryPort,
      useExisting: UsuarioAdapter,
    },
    {
      provide: PROGRESO_PORT,
      useClass: ProgresoAdapter,
    },
    {
      provide: OBJETIVO_PORT,
      useClass: ObjetivoAdapter,
    },
    UsuarioService,
    ProgresoService,
    ObjetivoService,
  ],
  exports: [UsuarioService, AuthUsuarioRepositoryPort, ObjetivoService],
})
export class UsuarioModule { }

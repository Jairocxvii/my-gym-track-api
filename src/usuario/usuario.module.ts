import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioService } from './aplication/services/usuario.service';
import { ProgresoService } from './aplication/services/progreso.service';
import { UsuarioController } from './infraestructure/controllers/usuario.controller';
import { USUARIO_PORT } from './domain/ports/usuario.port';
import { UsuarioAdapter } from './infraestructure/adapters/usuario.adapter';
import { Usuario } from './infraestructure/database/entities/usuario';
import { Preferencia } from './infraestructure/database/entities/preferencia';
import { Progreso } from './infraestructure/database/entities/progreso';
import { PROGRESO_PORT } from './domain/ports/progreso.port';
import { ProgresoAdapter } from './infraestructure/adapters/progreso.adapter';
import { CommonModule } from '@common/common.module';


@Module({
  imports: [CommonModule, TypeOrmModule.forFeature([Usuario, Preferencia, Progreso])],
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
})
export class UsuarioModule { }



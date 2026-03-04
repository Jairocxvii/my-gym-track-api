import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Ejercicio } from './infraestructure/database/entities/ejercicio';
import { Equipamiento } from './infraestructure/database/entities/equipamiento';
import { Rutina } from './infraestructure/database/entities/rutina';
import { Sesion } from './infraestructure/database/entities/sesion';
import { SesionEjercicio } from './infraestructure/database/entities/sesion-ejercicio';
import { RegistroEntrenamiento } from './infraestructure/database/entities/registro-entrenamiento';

import { EjercicioAdapter } from './infraestructure/adapters/ejercicio.adapter';
import { EquipamientoAdapter } from './infraestructure/adapters/equipamiento.adapter';
import { RutinaAdapter } from './infraestructure/adapters/rutina.adapter';
import { SesionAdapter } from './infraestructure/adapters/sesion.adapter';
import { SesionEjercicioAdapter } from './infraestructure/adapters/sesion-ejercicio.adapter';
import { RegistroEntrenamientoAdapter } from './infraestructure/adapters/registro-entrenamiento.adapter';

import { RutinaController } from './infraestructure/controllers/rutina.controller';
import { EjercicioController } from './infraestructure/controllers/ejercicio.controller';

import { EjercicioService } from './application/services/ejercicio.service';
import { RutinaService } from './application/services/rutina.service';

import { EjercicioRepositoryPort } from './domain/ports/ejercicio-repository.port';
import { EquipamientoRepositoryPort } from './domain/ports/equipamiento-repository.port';
import { RutinaRepositoryPort } from './domain/ports/rutina-repository.port';
import { SesionRepositoryPort } from './domain/ports/sesion-repository.port';
import { SesionEjercicioRepositoryPort } from './domain/ports/sesion-ejercicio-repository.port';
import { RegistroEntrenamientoRepositoryPort } from './domain/ports/registro-entrenamiento-repository.port';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Ejercicio,
      Equipamiento,
      Rutina,
      Sesion,
      SesionEjercicio,
      RegistroEntrenamiento,
    ]),
  ],
  controllers: [RutinaController, EjercicioController],
  providers: [
    EjercicioService,
    RutinaService,
    { provide: EjercicioRepositoryPort, useClass: EjercicioAdapter },
    { provide: EquipamientoRepositoryPort, useClass: EquipamientoAdapter },
    { provide: RutinaRepositoryPort, useClass: RutinaAdapter },
    { provide: SesionRepositoryPort, useClass: SesionAdapter },
    { provide: SesionEjercicioRepositoryPort, useClass: SesionEjercicioAdapter },
    { provide: RegistroEntrenamientoRepositoryPort, useClass: RegistroEntrenamientoAdapter },
  ],
  exports: [
    EjercicioService,
    RutinaService,
    EjercicioRepositoryPort,
    EquipamientoRepositoryPort,
    RutinaRepositoryPort,
    SesionRepositoryPort,
    SesionEjercicioRepositoryPort,
    RegistroEntrenamientoRepositoryPort,
  ],
})
export class RutinasModule { }

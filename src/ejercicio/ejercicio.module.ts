import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ejercicio } from './infraestructure/database/entities/ejercicio';
import { Equipamiento } from './infraestructure/database/entities/equipamiento';
import { EjercicioEquipamiento } from './infraestructure/database/entities/ejercicio-equipamiento';
@Module({
  imports: [TypeOrmModule.forFeature([Ejercicio, Equipamiento, EjercicioEquipamiento])],
  controllers: [],
  providers: [
  ],
})
export class EjercicioModule { }
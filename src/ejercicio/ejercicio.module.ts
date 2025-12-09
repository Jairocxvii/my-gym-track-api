import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ejercicio } from './infrastructure/database/entities/ejercicio';
import { Equipamiento } from './infrastructure/database/entities/equipamiento';
import { EjercicioEquipamiento } from './infrastructure/database/entities/ejercicio-equipamiento';
@Module({
  imports: [TypeOrmModule.forFeature([Ejercicio, Equipamiento, EjercicioEquipamiento])],
  controllers: [],
  providers: [],
})
export class EjercicioModule {}

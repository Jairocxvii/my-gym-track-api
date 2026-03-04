import { Injectable } from '@nestjs/common';
import { EjercicioRepositoryPort } from '../../domain/ports/ejercicio-repository.port';
import { EquipamientoRepositoryPort } from '../../domain/ports/equipamiento-repository.port';
import { EjercicioEntity } from '../../domain/entities/ejercicio.entity';
import { EquipamientoEntity } from '../../domain/entities/equipamiento.entity';

@Injectable()
export class EjercicioService {
    constructor(
        private readonly ejercicioRepository: EjercicioRepositoryPort,
        private readonly equipamientoRepository: EquipamientoRepositoryPort,
    ) { }

    async createEjercicio(entity: EjercicioEntity) {
        return this.ejercicioRepository.create(entity);
    }

    async findAllEjercicios() {
        return this.ejercicioRepository.findAll();
    }

    async createEquipamiento(entity: EquipamientoEntity) {
        return this.equipamientoRepository.create(entity);
    }

    async findAllEquipamiento() {
        return this.equipamientoRepository.findAll();
    }
}

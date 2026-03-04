import { Injectable } from '@nestjs/common';
import { RutinaRepositoryPort } from '../../domain/ports/rutina-repository.port';
import { SesionRepositoryPort } from '../../domain/ports/sesion-repository.port';
import { SesionEjercicioRepositoryPort } from '../../domain/ports/sesion-ejercicio-repository.port';
import { RegistroEntrenamientoRepositoryPort } from '../../domain/ports/registro-entrenamiento-repository.port';
import { RutinaEntity } from '../../domain/entities/rutina.entity';
import { SesionEntity } from '../../domain/entities/sesion.entity';
import { SesionEjercicioEntity } from '../../domain/entities/sesion-ejercicio.entity';
import { RegistroEntrenamientoEntity } from '../../domain/entities/registro-entrenamiento.entity';

@Injectable()
export class RutinaService {
    constructor(
        private readonly rutinaRepository: RutinaRepositoryPort,
        private readonly sesionRepository: SesionRepositoryPort,
        private readonly sesionEjercicioRepository: SesionEjercicioRepositoryPort,
        private readonly registroRepository: RegistroEntrenamientoRepositoryPort,
    ) { }

    // Routine operations
    async createRutina(entity: RutinaEntity) {
        return this.rutinaRepository.create(entity);
    }

    async findAllRutinas() {
        return this.rutinaRepository.findAll();
    }

    async findOneRutina(id: number) {
        // Note: findOneByIdOrFail is present in the adapter but not in the port. 
        // For now, using findOneById and we will handle the "fail" logic if needed or add it to the port.
        return this.rutinaRepository.findOneById(id);
    }

    async updateRutina(id: number, partial: Partial<RutinaEntity>) {
        // partialUpdate is also common in adapters, for now we can use a generic update or add partialUpdate to port
        // Given the controller usage, I should probably add partialUpdate to the port or just use update.
        return this.rutinaRepository.update(id, partial as RutinaEntity);
    }

    async deleteRutina(id: number) {
        return this.rutinaRepository.delete(id);
    }

    // Session operations
    async createSesion(entity: SesionEntity) {
        try {
            return await this.sesionRepository.create(entity);
        } catch (error) {
            throw new Error(error);
        }

    }

    async findSesiones() {
        return this.sesionRepository.findAll();
    }

    // Session Exercise operations
    async addEjercicioToSesion(entity: SesionEjercicioEntity) {
        return this.sesionEjercicioRepository.create(entity);
    }

    // Training Registry operations
    async createRegistro(entity: RegistroEntrenamientoEntity) {
        return this.registroRepository.create(entity);
    }
}

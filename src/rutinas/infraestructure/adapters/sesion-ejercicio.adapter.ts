import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial } from 'typeorm';
import { GenericTypeOrmAdapter } from '@common/database/generic-typeorm.adapter';
import { SesionEjercicioEntity } from '../../domain/entities/sesion-ejercicio.entity';
import { SesionEjercicio } from '../database/entities/sesion-ejercicio';
import { SesionEjercicioRepositoryPort } from '../../domain/ports/sesion-ejercicio-repository.port';

@Injectable()
export class SesionEjercicioAdapter extends GenericTypeOrmAdapter<SesionEjercicioEntity, SesionEjercicio, 'sesionEjercicioId'> implements SesionEjercicioRepositoryPort {
    protected primaryKeyName: 'sesionEjercicioId' = 'sesionEjercicioId';

    constructor(
        @InjectRepository(SesionEjercicio)
        private readonly repositorySesionEjercicio: Repository<SesionEjercicio>,
    ) {
        super(repositorySesionEjercicio);
    }

    protected toDomain(orm: SesionEjercicio): SesionEjercicioEntity {
        return new SesionEjercicioEntity(
            orm.sesionEjercicioId,
            orm.sesion?.sesion_id,
            orm.ejercicio?.ejercicioId,
            orm.orden,
            orm.series,
            orm.repeticiones,
            orm.descansoSeg,
            orm.isDeleted,
            orm.deletedAt,
            orm.isActivo,
        );
    }

    protected toEntityDB(domain: SesionEjercicioEntity): DeepPartial<SesionEjercicio> {
        return {
            sesionEjercicioId: domain.id,
            sesion: domain.sesionId ? { sesion_id: domain.sesionId } : undefined,
            ejercicio: domain.ejercicioId ? { ejercicioId: domain.ejercicioId } : undefined,
            orden: domain.orden,
            series: domain.series,
            repeticiones: domain.repeticiones,
            descansoSeg: domain.descansoSeg,
            isDeleted: domain.isDeleted,
            deletedAt: domain.deletedAt,
            isActivo: domain.isActivo,
        };
    }

    protected toColumnName(prop: keyof SesionEjercicioEntity): string {
        const map: Record<keyof SesionEjercicioEntity, string> = {
            id: 'sesionEjercicioId',
            sesionId: 'sesion',
            ejercicioId: 'ejercicio',
            orden: 'orden',
            series: 'series',
            repeticiones: 'repeticiones',
            descansoSeg: 'descansoSeg',
            isDeleted: 'isDeleted',
            deletedAt: 'deletedAt',
            isActivo: 'isActivo',
        };
        return map[prop];
    }
}

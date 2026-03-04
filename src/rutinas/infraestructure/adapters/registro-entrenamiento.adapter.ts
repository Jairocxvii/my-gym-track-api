import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial } from 'typeorm';
import { GenericTypeOrmAdapter } from '@common/database/generic-typeorm.adapter';
import { RegistroEntrenamientoEntity } from '../../domain/entities/registro-entrenamiento.entity';
import { RegistroEntrenamiento } from '../database/entities/registro-entrenamiento';
import { RegistroEntrenamientoRepositoryPort } from '../../domain/ports/registro-entrenamiento-repository.port';

@Injectable()
export class RegistroEntrenamientoAdapter extends GenericTypeOrmAdapter<RegistroEntrenamientoEntity, RegistroEntrenamiento, 'registro_id'> implements RegistroEntrenamientoRepositoryPort {
    protected primaryKeyName: 'registro_id' = 'registro_id';

    constructor(
        @InjectRepository(RegistroEntrenamiento)
        private readonly repositoryRegistro: Repository<RegistroEntrenamiento>,
    ) {
        super(repositoryRegistro);
    }

    protected toDomain(orm: RegistroEntrenamiento): RegistroEntrenamientoEntity {
        return new RegistroEntrenamientoEntity(
            orm.registro_id,
            orm.usuarioId,
            orm.sesion?.sesion_id,
            orm.sesion_ejercicio?.sesionEjercicioId,
            orm.fecha,
            orm.series_realizadas,
            orm.repeticiones_realizadas,
            orm.peso_utilizado_kg,
            orm.is_deleted,
            orm.deleted_at,
            orm.is_activo,
        );
    }

    protected toEntityDB(domain: RegistroEntrenamientoEntity): DeepPartial<RegistroEntrenamiento> {
        return {
            registro_id: domain.id,
            usuarioId: domain.usuarioId,
            sesion: domain.sesionId ? { sesion_id: domain.sesionId } : undefined,
            sesion_ejercicio: domain.sesionEjercicioId ? { sesionEjercicioId: domain.sesionEjercicioId } : undefined,
            fecha: domain.fecha,
            series_realizadas: domain.seriesRealizadas,
            repeticiones_realizadas: domain.repeticionesRealizadas,
            peso_utilizado_kg: domain.pesoUtilizadoKg,
            is_deleted: domain.isDeleted,
            deleted_at: domain.deletedAt,
            is_activo: domain.isActivo,
        };
    }

    protected toColumnName(prop: keyof RegistroEntrenamientoEntity): string {
        const map: Record<keyof RegistroEntrenamientoEntity, string> = {
            id: 'registro_id',
            usuarioId: 'usuarioId',
            sesionId: 'sesion',
            sesionEjercicioId: 'sesion_ejercicio',
            fecha: 'fecha',
            seriesRealizadas: 'series_realizadas',
            repeticionesRealizadas: 'repeticiones_realizadas',
            pesoUtilizadoKg: 'peso_utilizado_kg',
            isDeleted: 'is_deleted',
            deletedAt: 'deleted_at',
            isActivo: 'is_activo',
        };
        return map[prop];
    }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial } from 'typeorm';
import { GenericTypeOrmAdapter } from '@common/database/generic-typeorm.adapter';
import { SesionEntity } from '../../domain/entities/sesion.entity';
import { Sesion } from '../database/entities/sesion';
import { SesionRepositoryPort } from '../../domain/ports/sesion-repository.port';

@Injectable()
export class SesionAdapter extends GenericTypeOrmAdapter<SesionEntity, Sesion, 'sesion_id'> implements SesionRepositoryPort {
    protected primaryKeyName: 'sesion_id' = 'sesion_id';

    constructor(
        @InjectRepository(Sesion)
        private readonly sesionRepository: Repository<Sesion>,
    ) {
        super(sesionRepository);
    }

    protected toDomain(orm: Sesion): SesionEntity {
        return new SesionEntity(
            orm.sesion_id,
            orm.rutina_id,
            orm.nombre,
            orm.dia_orden,
            orm.is_deleted,
            orm.deleted_at,
            orm.is_activo,
        );
    }

    protected toEntityDB(domain: SesionEntity): DeepPartial<Sesion> {
        return {
            sesion_id: domain.id,
            rutina: domain.rutinaId ? { rutinaId: domain.rutinaId } : undefined,
            nombre: domain.nombre,
            dia_orden: domain.diaOrden,
            is_deleted: domain.isDeleted,
            deleted_at: domain.deletedAt,
            is_activo: domain.isActivo,
        };
    }

    protected toColumnName(prop: keyof SesionEntity): string {
        const map: Record<keyof SesionEntity, string> = {
            id: 'sesion_id',
            rutinaId: 'rutina',
            nombre: 'nombre',
            diaOrden: 'dia_orden',
            isDeleted: 'is_deleted',
            deletedAt: 'deleted_at',
            isActivo: 'is_activo',
        };
        return map[prop];
    }
}

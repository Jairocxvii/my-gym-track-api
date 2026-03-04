import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial } from 'typeorm';
import { GenericTypeOrmAdapter } from '@common/database/generic-typeorm.adapter';
import { EquipamientoEntity } from '../../domain/entities/equipamiento.entity';
import { Equipamiento } from '../database/entities/equipamiento';
import { EquipamientoRepositoryPort } from '../../domain/ports/equipamiento-repository.port';

@Injectable()
export class EquipamientoAdapter extends GenericTypeOrmAdapter<EquipamientoEntity, Equipamiento, 'equipamientoId'> implements EquipamientoRepositoryPort {
    protected primaryKeyName: 'equipamientoId' = 'equipamientoId';

    constructor(
        @InjectRepository(Equipamiento)
        private readonly repositoryEquipamiento: Repository<Equipamiento>,
    ) {
        super(repositoryEquipamiento);
    }

    protected toDomain(orm: Equipamiento): EquipamientoEntity {
        return new EquipamientoEntity(
            orm.equipamientoId,
            orm.descripcion,
            orm.isDeleted,
            orm.deletedAt,
            orm.isActivo,
        );
    }

    protected toEntityDB(domain: EquipamientoEntity): DeepPartial<Equipamiento> {
        return {
            equipamientoId: domain.id,
            descripcion: domain.descripcion,
            isDeleted: domain.isDeleted,
            deletedAt: domain.deletedAt,
            isActivo: domain.isActivo,
        };
    }

    protected toColumnName(prop: keyof EquipamientoEntity): string {
        const map: Record<keyof EquipamientoEntity, string> = {
            id: 'equipamientoId',
            descripcion: 'descripcion',
            isDeleted: 'isDeleted',
            deletedAt: 'deletedAt',
            isActivo: 'isActivo',
        };
        return map[prop];
    }
}

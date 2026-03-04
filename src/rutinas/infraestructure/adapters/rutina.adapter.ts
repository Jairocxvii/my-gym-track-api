import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial } from 'typeorm';
import { GenericTypeOrmAdapter } from '@common/database/generic-typeorm.adapter';
import { RutinaEntity } from '../../domain/entities/rutina.entity';
import { Rutina } from '../database/entities/rutina';
import { RutinaRepositoryPort } from '../../domain/ports/rutina-repository.port';

@Injectable()
export class RutinaAdapter extends GenericTypeOrmAdapter<RutinaEntity, Rutina, 'rutinaId'> implements RutinaRepositoryPort {
    protected primaryKeyName: 'rutinaId' = 'rutinaId';

    constructor(
        @InjectRepository(Rutina)
        private readonly rutinaRepository: Repository<Rutina>,
    ) {
        super(rutinaRepository);
    }

    protected toDomain(orm: Rutina): RutinaEntity {
        return new RutinaEntity(
            orm.rutinaId,
            orm.usuarioId,
            orm.nombre,
            orm.fechaCreacion,
            orm.tipoDivision,
            orm.isDeleted,
            orm.deletedAt,
            orm.isActivo,
        );
    }

    protected toEntityDB(domain: RutinaEntity): DeepPartial<Rutina> {
        return {
            rutinaId: domain.id,
            usuarioId: domain.usuarioId,
            nombre: domain.nombre,
            fechaCreacion: domain.fechaCreacion,
            tipoDivision: domain.tipoDivision,
            isDeleted: domain.isDeleted,
            deletedAt: domain.deletedAt,
            isActivo: domain.isActivo,
        };
    }

    protected toColumnName(prop: keyof RutinaEntity): string {
        const map: Record<keyof RutinaEntity, string> = {
            id: 'rutinaId',
            usuarioId: 'usuarioId',
            nombre: 'nombre',
            fechaCreacion: 'fechaCreacion',
            tipoDivision: 'tipoDivision',
            isDeleted: 'isDeleted',
            deletedAt: 'deletedAt',
            isActivo: 'isActivo',
        };
        return map[prop];
    }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial } from 'typeorm';
import { GenericTypeOrmAdapter } from '@common/database/generic-typeorm.adapter';
import { EjercicioEntity } from '../../domain/entities/ejercicio.entity';
import { Ejercicio } from '../database/entities/ejercicio';
import { EjercicioRepositoryPort } from '../../domain/ports/ejercicio-repository.port';

@Injectable()
export class EjercicioAdapter extends GenericTypeOrmAdapter<EjercicioEntity, Ejercicio, 'ejercicioId'> implements EjercicioRepositoryPort {
    protected primaryKeyName: 'ejercicioId' = 'ejercicioId';

    constructor(
        @InjectRepository(Ejercicio)
        private readonly repositoryEjercicio: Repository<Ejercicio>,
    ) {
        super(repositoryEjercicio);
    }

    protected toDomain(orm: Ejercicio): EjercicioEntity {
        return new EjercicioEntity(
            orm.ejercicioId,
            orm.nombre,
            orm.categoria,
            orm.musculoPrincipal,
            orm.isDeleted,
            orm.deletedAt,
            orm.isActivo,
        );
    }

    protected toEntityDB(domain: EjercicioEntity): DeepPartial<Ejercicio> {
        return {
            ejercicioId: domain.id,
            nombre: domain.nombre,
            categoria: domain.categoria,
            musculoPrincipal: domain.musculoPrincipal,
            isDeleted: domain.isDeleted,
            deletedAt: domain.deletedAt,
            isActivo: domain.isActivo,
        };
    }

    protected toColumnName(prop: keyof EjercicioEntity): string {
        const map: Record<keyof EjercicioEntity, string> = {
            id: 'ejercicioId',
            nombre: 'nombre',
            categoria: 'categoria',
            musculoPrincipal: 'musculoPrincipal',
            isDeleted: 'isDeleted',
            deletedAt: 'deletedAt',
            isActivo: 'isActivo',
        };
        return map[prop];
    }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial } from 'typeorm';
import { ProgresoEntity } from '../../domain/entities/progreso.entity';

import { ProgresoPort } from '../../domain/ports/progreso.port';
import { GenericTypeOrmAdapter } from './generic-typeorm.adapter';
import { Progreso } from '../database/entities/progreso';

@Injectable()
export class ProgresoAdapter
    extends GenericTypeOrmAdapter<ProgresoEntity, Progreso, 'progreso_id'>
    implements ProgresoPort {
    protected primaryKeyName: 'progreso_id' = 'progreso_id';
    constructor(
        @InjectRepository(Progreso)
        repository: Repository<Progreso>,
    ) {
        super(repository);
    }


    // Métodos del mapper
    protected toDomain(orm: Progreso): ProgresoEntity {
        const progreso = new ProgresoEntity({
            id: orm.progreso_id,
            fecha: orm.fecha,
            pesoKg: orm.peso_kg,
            medidas: orm.medidas,
            notas: orm.notas,
            creadoEn: orm.created_at
        });
        return progreso;
    }

    protected toEntityDB(domain: ProgresoEntity): DeepPartial<Progreso> {
        return {
            progreso_id: domain.id,
            usuario: { usuario_id: domain.usuarioId },
            fecha: domain.fecha,
            peso_kg: domain.pesoKg,
            medidas: domain.medidas,
            notas: domain.notas,
            created_at: domain.creadoEn
        };
    }

    protected toColumnName(prop: keyof ProgresoEntity): string {
        return PROGRESO_DOMAIN_TO_COLUMN[prop];
    }


}

// Mapeo de propiedades de dominio a columnas de BD
export const PROGRESO_DOMAIN_TO_COLUMN: Record<keyof ProgresoEntity, string> = {
    id: 'progreso_id',
    usuarioId: 'usuario_id',
    fecha: 'fecha',
    pesoKg: 'peso_kg',
    medidas: 'medidas',
    notas: 'notas',
    creadoEn: 'created_at'
}
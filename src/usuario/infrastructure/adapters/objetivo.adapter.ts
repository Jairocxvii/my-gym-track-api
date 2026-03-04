import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial } from 'typeorm';
import { ObjetivoEntity } from '../../domain/entities/objetivo.entity';
import { TipoObjetivoEntity } from '../../domain/entities/tipo-objetivo.entity';
import { ActividadEntity } from '../../domain/entities/actividad.entity';
import { UnidadMedidaEntity } from '../../domain/entities/unidad-medida.entity';
import { ObjetivoPort } from '../../domain/ports/objetivo.port';
import { GenericTypeOrmAdapter } from '@common/database/generic-typeorm.adapter';
import { Objetivo } from '../database/entities/objetivo';
import { TipoObjetivo } from '../database/entities/tipo-objetivo';
import { Actividad } from '../database/entities/actividad';
import { UnidadMedida } from '../database/entities/unidad-medida';

@Injectable()
export class ObjetivoAdapter extends GenericTypeOrmAdapter<ObjetivoEntity, Objetivo, 'id'> implements ObjetivoPort {
    protected primaryKeyName: 'id' = 'id';

    constructor(
        @InjectRepository(Objetivo)
        repository: Repository<Objetivo>,
        @InjectRepository(TipoObjetivo)
        private readonly tipoObjetivoRepo: Repository<TipoObjetivo>,
        @InjectRepository(Actividad)
        private readonly actividadRepo: Repository<Actividad>,
        @InjectRepository(UnidadMedida)
        private readonly unidadMedidaRepo: Repository<UnidadMedida>,
    ) {
        super(repository);
    }

    protected toDomain(orm: Objetivo): ObjetivoEntity {
        return new ObjetivoEntity({
            id: orm.id,
            usuarioId: orm.usuario_id,
            tipoObjetivoId: orm.tipo_objetivo_id,
            nombrePersonalizado: orm.nombre_personalizado,
            valorMetaTotal: Number(orm.valor_meta_total),
            fechaInicio: orm.fecha_inicio,
            fechaLimite: orm.fecha_limite,
            completado: orm.completado,
            isDeleted: orm.is_deleted,
            deletedAt: orm.deleted_at,
            isActivo: orm.is_activo,
            tipoObjetivoNombre: orm.tipo_objetivo?.nombre,
            unidadMedidaNombre: orm.tipo_objetivo?.unidad_medida?.nombre,
        });
    }

    protected toEntityDB(domain: ObjetivoEntity): DeepPartial<Objetivo> {
        return {
            id: domain.id,
            usuario_id: domain.usuarioId,
            tipo_objetivo_id: domain.tipoObjetivoId,
            nombre_personalizado: domain.nombrePersonalizado,
            valor_meta_total: domain.valorMetaTotal,
            fecha_inicio: domain.fechaInicio,
            fecha_limite: domain.fechaLimite,
            completado: domain.completado,
            is_deleted: domain.isDeleted,
            deleted_at: domain.deletedAt,
            is_activo: domain.isActivo,
        };
    }

    protected toColumnName(prop: keyof ObjetivoEntity): string {
        return OBJETIVO_DOMAIN_TO_COLUMN[prop];
    }

    async findAll(query?: any): Promise<ObjetivoEntity[]> {
        const goals = await this.repository.find({
            where: query ? { usuario_id: query.usuarioId } : {},
            relations: ['tipo_objetivo', 'tipo_objetivo.unidad_medida'],
        });
        return goals.map((g) => this.toDomain(g));
    }

    async findOneById(id: number): Promise<ObjetivoEntity | null> {
        const goal = await this.repository.findOne({
            where: { id } as any,
            relations: ['tipo_objetivo', 'tipo_objetivo.unidad_medida'],
        });
        return goal ? this.toDomain(goal) : null;
    }

    async findTypes(): Promise<TipoObjetivoEntity[]> {
        const types = await this.tipoObjetivoRepo.find();
        return types.map(
            (t) =>
                new TipoObjetivoEntity({
                    id: t.id,
                    nombre: t.nombre,
                    unidadMedidaId: t.unidad_medida_id,
                    isDeleted: t.is_deleted,
                    deletedAt: t.deleted_at,
                    isActivo: t.is_activo,
                }),
        );
    }

    async createType(type: TipoObjetivoEntity): Promise<TipoObjetivoEntity> {
        const created = await this.tipoObjetivoRepo.save({
            nombre: type.nombre,
            unidad_medida_id: type.unidadMedidaId,
        });
        return new TipoObjetivoEntity({
            id: created.id,
            nombre: created.nombre,
            unidadMedidaId: created.unidad_medida_id,
        });
    }

    async findUnits(): Promise<UnidadMedidaEntity[]> {
        const units = await this.unidadMedidaRepo.find();
        return units.map(
            (u) =>
                new UnidadMedidaEntity({
                    id: u.id,
                    nombre: u.nombre,
                    abreviatura: u.abreviatura,
                    isDeleted: u.is_deleted,
                    deletedAt: u.deleted_at,
                    isActivo: u.is_activo,
                }),
        );
    }

    async findActivitiesByGoalId(usuarioId: number, goalId: number): Promise<ActividadEntity[]> {
        const activities = await this.actividadRepo.find({
            where: {
                objetivo_id: goalId,
                usuario_id: usuarioId,
            },
            relations: ['objetivo', 'unidad_medida'],
        });
        return activities.map(
            (a) =>
                new ActividadEntity({
                    id: a.id,
                    objetivoId: a.objetivo_id,
                    usuarioId: a.usuario_id,
                    unidadMedidaId: a.unidad_medida_id,
                    nombre: a.nombre,
                    descripcion: a.descripcion,
                    valorEspecifico: Number(a.valor_especifico),
                    createdAt: a.creado_en,
                    isDeleted: a.is_deleted,
                    deletedAt: a.deleted_at,
                    isActivo: a.is_activo,
                    nombreObjetivo: a.objetivo?.nombre_personalizado,
                    unidadMedidaNombre: a.unidad_medida?.nombre,
                }),
        );
    }

    async findActivities(usuarioId: number): Promise<ActividadEntity[]> {
        const activities = await this.actividadRepo.find({
            where: {
                usuario_id: usuarioId,
            },
            relations: ['objetivo', 'unidad_medida'],
        });
        return activities.map(
            (a) =>
                new ActividadEntity({
                    id: a.id,
                    objetivoId: a.objetivo_id,
                    usuarioId: a.usuario_id,
                    unidadMedidaId: a.unidad_medida_id,
                    nombre: a.nombre,
                    descripcion: a.descripcion,
                    valorEspecifico: Number(a.valor_especifico),
                    createdAt: a.creado_en,
                    isDeleted: a.is_deleted,
                    deletedAt: a.deleted_at,
                    isActivo: a.is_activo,
                    nombreObjetivo: a.objetivo?.nombre_personalizado,
                    unidadMedidaNombre: a.unidad_medida?.nombre,
                }),
        );
    }

    async addActivity(usuarioId: number, activity: ActividadEntity): Promise<ActividadEntity> {
        const goal = await this.repository.findOne({
            where: { id: activity.objetivoId, usuario_id: usuarioId },
        });

        if (!goal) {
            throw new Error('Objetivo no encontrado o no pertenece al usuario');
        }

        const unit = await this.unidadMedidaRepo.findOne({
            where: { id: activity.unidadMedidaId },
        });

        const created = await this.actividadRepo.save({
            objetivo_id: activity.objetivoId,
            usuario_id: usuarioId,
            unidad_medida_id: activity.unidadMedidaId,
            nombre: activity.nombre,
            descripcion: activity.descripcion,
            valor_especifico: activity.valorEspecifico,
        });

        return new ActividadEntity({
            id: created.id,
            objetivoId: created.objetivo_id,
            usuarioId: created.usuario_id,
            unidadMedidaId: created.unidad_medida_id,
            nombre: created.nombre,
            descripcion: created.descripcion,
            valorEspecifico: Number(created.valor_especifico),
            createdAt: created.creado_en,
            isDeleted: created.is_deleted,
            deletedAt: created.deleted_at,
            isActivo: created.is_activo,
            nombreObjetivo: goal.nombre_personalizado,
            unidadMedidaNombre: unit?.nombre,
        });
    }

    async removeActivity(usuarioId: number, activityId: number): Promise<void> {
        const activity = await this.actividadRepo.findOne({
            where: {
                id: activityId,
                usuario_id: usuarioId,
            },
        });

        if (!activity) {
            throw new Error('Actividad no encontrada o no pertenece al usuario');
        }

        await this.actividadRepo.update(activityId, {
            is_deleted: true,
            is_activo: false,
            deleted_at: new Date(),
        });
    }
}

export const OBJETIVO_DOMAIN_TO_COLUMN: Record<keyof ObjetivoEntity, string> = {
    id: 'id',
    usuarioId: 'usuario_id',
    tipoObjetivoId: 'tipo_objetivo_id',
    nombrePersonalizado: 'nombre_personalizado',
    valorMetaTotal: 'valor_meta_total',
    fechaInicio: 'fecha_inicio',
    fechaLimite: 'fecha_limite',
    completado: 'completado',
    tipoObjetivoNombre: '',
    unidadMedidaNombre: '',
    isDeleted: 'is_deleted',
    deletedAt: 'deleted_at',
    isActivo: 'is_activo',
};


import { Inject, Injectable } from '@nestjs/common';
import { ObjetivoPort } from '../../domain/ports/objetivo.port';
import { ObjetivoCreateDto, ActividadCreateDto, TipoObjetivoDto, UnidadMedidaDto, ObjetivoUpdateDto } from '../dtos/objetivo.dto';
import { ObjetivoEntity } from '../../domain/entities/objetivo.entity';
import { ActividadEntity } from '../../domain/entities/actividad.entity';
import { TipoObjetivoEntity } from '../../domain/entities/tipo-objetivo.entity';
import { UnidadMedidaEntity } from '../../domain/entities/unidad-medida.entity';
import { ObjetivoMapper } from '../mappers/objetivo.mapper';
import { EntityNotFoundException } from '@common/domain/exceptions/entity-not-found.exception';

export const OBJETIVO_PORT = 'OBJETIVO_PORT';

@Injectable()
export class ObjetivoService {
    constructor(
        @Inject(OBJETIVO_PORT)
        private readonly objetivoPort: ObjetivoPort,
    ) { }

    async create(dto: ObjetivoCreateDto, usuarioId: number) {
        const entity = new ObjetivoEntity({
            ...dto,
            usuarioId,
            fechaInicio: new Date(dto.fechaInicio),
            fechaLimite: new Date(dto.fechaLimite),
            completado: false,
        });
        const created = await this.objetivoPort.create(entity);
        return ObjetivoMapper.toResponse(created);
    }

    async update(id: number, dto: ObjetivoUpdateDto, usuarioId: number) {
        const goal = await this.objetivoPort.findOneById(id);
        if (!goal || goal.usuarioId !== usuarioId) {
            throw new EntityNotFoundException('Objetivo', id);
        }

        const partial: Partial<ObjetivoEntity> = {
            ...dto,
            fechaInicio: dto.fechaInicio ? new Date(dto.fechaInicio) : undefined,
            fechaLimite: dto.fechaLimite ? new Date(dto.fechaLimite) : undefined,
        };
        const updated = await this.objetivoPort.partialUpdate(id, partial);
        return ObjetivoMapper.toResponse(updated);

    }



    async findAll(usuarioId: number) {
        const goals = await this.objetivoPort.findAll({ usuarioId });
        return goals.map((g) => ObjetivoMapper.toResponse(g));
    }

    async findOne(usuarioId: number, id: number) {
        const goal = await this.objetivoPort.findOneById(id);
        if (!goal || goal.usuarioId !== usuarioId) {
            throw new EntityNotFoundException('Objetivo', id);
        }
        return ObjetivoMapper.toResponse(goal);
    }

    async addActivity(usuarioId: number, goalId: number, dto: ActividadCreateDto) {
        const goal = await this.objetivoPort.findOneById(goalId);
        if (!goal || goal.usuarioId !== usuarioId) {
            throw new EntityNotFoundException('Objetivo', goalId);
        }

        const activity = new ActividadEntity({
            ...dto,
            objetivoId: goalId,
            usuarioId,
        });
        const created = await this.objetivoPort.addActivity(usuarioId, activity);
        return ObjetivoMapper.actividadToResponse(created);
    }


    async removeActivity(usuarioId: number, activityId: number) {
        await this.objetivoPort.removeActivity(usuarioId, activityId);
        return { success: true };
    }

    async getTypes() {
        const types = await this.objetivoPort.findTypes();
        return types.map(ObjetivoMapper.tipoToResponse);
    }

    async createType(dto: TipoObjetivoDto) {
        const type = new TipoObjetivoEntity(dto);
        const created = await this.objetivoPort.createType(type);
        return ObjetivoMapper.tipoToResponse(created);
    }

    async getUnits() {
        const units = await this.objetivoPort.findUnits();
        return units.map(ObjetivoMapper.unidadToResponse);
    }
}


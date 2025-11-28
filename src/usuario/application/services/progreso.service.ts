import { Inject, Injectable } from '@nestjs/common';
import { PROGRESO_PORT, ProgresoPort } from '../../domain/ports/progreso.port';
import { ProgresoApiMapper } from '../mappers/progreso-api.mapper';
import { ProgresoCreateDto } from '../dtos/progreso-create.dto';
import { ProgresoEntity } from '../../domain/entities/progreso.entity';
//import { ProgresosFindDto } from '../dtos/progresos-find.dto';

@Injectable()
export class ProgresoService {
    constructor(
        @Inject(PROGRESO_PORT)
        private readonly progresoPort: ProgresoPort,
    ) { }

    async create(createProgresoDto: ProgresoCreateDto) {
        const progreso = new ProgresoEntity(createProgresoDto);
        const progresoCreado = await this.progresoPort.create(progreso);
        return ProgresoApiMapper.toResponse(progresoCreado);
    }
    /*
        async findAll(query: FindprogresosQuery) {
            const progresos = await this.progresoPort.findAll({
                ...(query.isDeleted !== undefined && { isDeleted: query.isDeleted }),
                ...(query.usuario_id && { _like: { usuario_id: query.usuario_id } }),
                ...(query.limit && { _limit: query.limit }),
                ...(query.offset && { _offset: query.offset }),
                _order: { by: 'usuario_id', dir: 'ASC' },
            });
            return progresos.map((progreso) => ProgresoApiMapper.toResponse(progreso));
        }*/

    async findOne(id: number) {

        const progreso = await this.progresoPort.findOneById(id);
        if (!progreso) {
            throw new Error('progreso no encontrado');
        }
        return ProgresoApiMapper.toResponse(progreso);
    }

    async update(id: number, updateProgresoDto: any) {
        const progresoActualizado = await this.progresoPort.update(id, updateProgresoDto);
        return ProgresoApiMapper.toResponse(progresoActualizado);
    }

    async delete(id: number) {
        const progreso = await this.progresoPort.findOneById(id);
        if (!progreso) {
            throw new Error('progreso no encontrado');
        }

        await this.progresoPort.update(id, progreso);
        return "progreso eliminado correctamente";
    }
}

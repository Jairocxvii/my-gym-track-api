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

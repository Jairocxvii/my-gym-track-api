import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { CreateEjercicioDto, CreateEquipamientoDto } from '../dtos/routine.dtos';
import { EjercicioEntity } from '../../domain/entities/ejercicio.entity';
import { EquipamientoEntity } from '../../domain/entities/equipamiento.entity';
import { EjercicioService } from '../../application/services/ejercicio.service';

@Controller('ejercicios')
export class EjercicioController {
    constructor(
        private readonly ejercicioService: EjercicioService,
    ) { }

    @Post()
    async createEjercicio(@Body() dto: CreateEjercicioDto) {
        const entity = new EjercicioEntity(undefined, dto.nombre, dto.categoria, dto.musculoPrincipal);
        return this.ejercicioService.createEjercicio(entity);
    }

    @Get()
    async findAllEjercicios() {
        return this.ejercicioService.findAllEjercicios();
    }

    @Post('equipamiento')
    async createEquipamiento(@Body() dto: CreateEquipamientoDto) {
        const entity = new EquipamientoEntity(undefined, dto.descripcion);
        return this.ejercicioService.createEquipamiento(entity);
    }

    @Get('equipamiento')
    async findAllEquipamiento() {
        return this.ejercicioService.findAllEquipamiento();
    }
}

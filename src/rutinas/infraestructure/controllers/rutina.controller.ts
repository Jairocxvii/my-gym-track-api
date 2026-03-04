import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { RutinaService } from '../../application/services/rutina.service';
import { CreateRutinaDto, CreateSesionDto, CreateSesionEjercicioDto, CreateRegistroEntrenamientoDto } from '../dtos/routine.dtos';
import { RutinaEntity } from '../../domain/entities/rutina.entity';
import { SesionEntity } from '../../domain/entities/sesion.entity';
import { SesionEjercicioEntity } from '../../domain/entities/sesion-ejercicio.entity';
import { RegistroEntrenamientoEntity } from '../../domain/entities/registro-entrenamiento.entity';
import { Auth } from 'src/auth/infrastructure/decorators/auth.decorator';
import { ApiOperation } from '@nestjs/swagger';
import { UsuarioEntity } from 'src/usuario/domain/entities/usuario.entity';
import { User } from 'src/auth/infrastructure/decorators/user.decorator';
@Controller('rutinas')
export class RutinaController {
    constructor(
        private readonly rutinaService: RutinaService,
    ) { }




    @Post()
    @Auth()
    @ApiOperation({ summary: 'crear una rutina' })
    async create(@User() user: UsuarioEntity, @Body() createDto: CreateRutinaDto) {
        const entity = new RutinaEntity(
            undefined,
            user.id,
            createDto.nombre,
            new Date(),
            createDto.tipoDivision,
        );
        return this.rutinaService.createRutina(entity);
    }

    @Get()
    @Auth()
    @ApiOperation({ summary: 'obtener todas las rutinas' })
    async findAll() {
        return this.rutinaService.findAllRutinas();
    }

    @Get(':id')
    @Auth()
    @ApiOperation({ summary: 'obtener una rutina por id' })
    async findOne(@Param('id') id: string) {
        return this.rutinaService.findOneRutina(+id);
    }

    @Patch(':id')
    @Auth()
    @ApiOperation({ summary: 'actualizar una rutina' })
    async update(@Param('id') id: string, @Body() updateDto: Partial<CreateRutinaDto>) {
        const partial: Partial<RutinaEntity> = {
            ...updateDto,
        };
        return this.rutinaService.updateRutina(+id, partial);
    }

    @Delete(':id')
    @Auth()
    @ApiOperation({ summary: 'eliminar una rutina' })
    async remove(@Param('id') id: string) {
        return this.rutinaService.deleteRutina(+id);
    }

    // Session Endpoints
    @Post(':id/sesiones')
    @Auth()
    @ApiOperation({ summary: 'crear una sesion' })
    async createSesion(@Param('id') id: string, @Body() dto: CreateSesionDto) {
        const entity = new SesionEntity(undefined, +id, dto.nombre, dto.diaOrden);
        return this.rutinaService.createSesion(entity);
    }

    @Get(':id/sesiones')
    @Auth()
    @ApiOperation({ summary: 'obtener las sesiones de una rutina' })
    async findSesiones(@Param('id') id: string) {
        return this.rutinaService.findSesiones();
    }

    // Session Exercise Endpoints
    @Post('sesiones/:sesionId/ejercicios')
    @Auth()
    @ApiOperation({ summary: 'agregar un ejercicio a una sesion' })
    async addEjercicioToSesion(@Param('sesionId') sesionId: string, @Body() dto: CreateSesionEjercicioDto) {
        const entity = new SesionEjercicioEntity(
            undefined,
            +sesionId,
            dto.ejercicioId,
            dto.orden,
            dto.series,
            dto.repeticiones,
            dto.descansoSeg,
        );
        return this.rutinaService.addEjercicioToSesion(entity);
    }

    // Training Registry Endpoints
    @Post('registro')
    @Auth()
    @ApiOperation({ summary: 'crear un registro de entrenamiento' })
    async createRegistro(@User() user: UsuarioEntity, @Body() dto: CreateRegistroEntrenamientoDto) {
        const entity = new RegistroEntrenamientoEntity(
            undefined,
            user.id,
            dto.sesionId,
            dto.sesionEjercicioId,
            dto.fecha || new Date(),
            dto.seriesRealizadas,
            dto.repeticionesRealizadas,
            dto.pesoUtilizadoKg,
        );
        return this.rutinaService.createRegistro(entity);
    }
}

import { Controller, Get, Post, Body, Param, Delete, ParseIntPipe, Query, Patch } from '@nestjs/common';
import { ObjetivoService } from '../../application/services/objetivo.service';
import { ObjetivoCreateDto, ActividadCreateDto, TipoObjetivoDto, UnidadMedidaDto, ObjetivoUpdateDto } from '../../application/dtos/objetivo.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { Auth } from 'src/auth/infrastructure/decorators/auth.decorator';
import { User } from 'src/auth/infrastructure/decorators/user.decorator';
import { UsuarioEntity } from '../../domain/entities/usuario.entity';
import { ObjetivoEntity } from '../../domain/entities/objetivo.entity';
import { ActividadEntity } from '../../domain/entities/actividad.entity';
import { TipoObjetivoEntity } from '../../domain/entities/tipo-objetivo.entity';
import { Roles } from 'src/usuario/domain/interfaces/roles';

@ApiTags('objetivos')
@Controller('usuario/objetivos')
export class ObjetivoController {
    constructor(private readonly objetivoService: ObjetivoService) { }

    @Post()
    @Auth()
    @ApiOperation({ summary: 'Crear un nuevo objetivo' })
    async create(@User() user: UsuarioEntity, @Body() createDto: ObjetivoCreateDto) {
        const entity = new ObjetivoEntity({
            ...createDto,
            usuarioId: user.id,
            fechaInicio: new Date(createDto.fechaInicio),
            fechaLimite: new Date(createDto.fechaLimite),
            completado: false,
        });
        return this.objetivoService.create(entity);
    }

    @Patch(':id')
    @Auth()
    @ApiOperation({ summary: 'Actualizar un objetivo' })
    async update(
        @User() user: UsuarioEntity,
        @Param('id', ParseIntPipe) id: number,
        @Body() updateDto: ObjetivoUpdateDto,
    ) {
        const partial: Partial<ObjetivoEntity> = {
            ...updateDto,
            fechaInicio: updateDto.fechaInicio ? new Date(updateDto.fechaInicio) : undefined,
            fechaLimite: updateDto.fechaLimite ? new Date(updateDto.fechaLimite) : undefined,
        };
        return this.objetivoService.update(id, partial, user.id);
    }

    @Delete(':id')
    @Auth()
    @ApiOperation({ summary: 'Eliminar un objetivo' })
    async delete(
        @User() user: UsuarioEntity,
        @Param('id', ParseIntPipe) id: number,
    ) {
        return this.objetivoService.delete(id, user.id);
    }

    @Get('all')
    @Auth()
    @ApiOperation({ summary: 'Obtener todos los objetivos de un usuario' })
    async findAll(@User() user: UsuarioEntity) {
        return this.objetivoService.findAll(user.id);
    }

    @Get('tipos')
    @ApiOperation({ summary: 'Obtener tipos de objetivo' })
    async getTypes() {
        return this.objetivoService.getTypes();
    }

    @Post('tipos')
    @Auth(Roles.ADMINISTRADOR)
    @ApiOperation({ summary: 'Crear un tipo de objetivo' })
    async createType(@Body() dto: TipoObjetivoDto) {
        const entity = new TipoObjetivoEntity(dto);
        return this.objetivoService.createType(entity);
    }

    @Get('unidades-medida')
    @ApiOperation({ summary: 'Obtener unidades de medida' })
    async getUnits() {
        return this.objetivoService.getUnits();
    }

    @Get(':id')
    @Auth()
    @ApiOperation({ summary: 'Obtener un objetivo por ID' })
    async findOne(@User() user: UsuarioEntity, @Param('id', ParseIntPipe) id: number) {
        return this.objetivoService.findOne(user.id, id);
    }

    @Post(':id/actividades')
    @Auth()
    @ApiOperation({ summary: 'Agregar una actividad a un objetivo' })
    async addActivity(@User() user: UsuarioEntity, @Param('id', ParseIntPipe) goalId: number, @Body() dto: ActividadCreateDto) {
        const entity = new ActividadEntity({
            ...dto,
            objetivoId: goalId,
            usuarioId: user.id,
        });
        return this.objetivoService.addActivity(user.id, goalId, entity);
    }

    @Delete('actividades/:activityId')
    @Auth()
    @ApiOperation({ summary: 'Eliminar una actividad' })
    async removeActivity(@User() user: UsuarioEntity, @Param('activityId', ParseIntPipe) activityId: number) {
        return this.objetivoService.removeActivity(user.id, activityId);
    }

    @Get('actividades/all')
    @Auth()
    @ApiOperation({ summary: 'obtener todas las actividades de un usuario' })
    async getActivities(@User() user: UsuarioEntity) {
        return this.objetivoService.getActivities(user.id);
    }
}


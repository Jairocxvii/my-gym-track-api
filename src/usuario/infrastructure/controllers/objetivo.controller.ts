import { Controller, Get, Post, Body, Param, Delete, ParseIntPipe, Query, Patch } from '@nestjs/common';
import { ObjetivoService } from '../../application/services/objetivo.service';
import { ObjetivoCreateDto, ActividadCreateDto, TipoObjetivoDto, UnidadMedidaDto, ObjetivoUpdateDto } from '../../application/dtos/objetivo.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { Auth } from 'src/auth/infrastructure/decorators/auth.decorator';
import { User } from 'src/auth/infrastructure/decorators/user.decorator';
import { UsuarioEntity } from '../../domain/entities/usuario.entity';
import { Roles } from 'src/usuario/domain/interfaces/roles';

@ApiTags('objetivos')
@Controller('usuario/objetivos')
export class ObjetivoController {
    constructor(private readonly objetivoService: ObjetivoService) { }

    @Post()
    @Auth()
    @ApiOperation({ summary: 'Crear un nuevo objetivo' })
    async create(@User() user: UsuarioEntity, @Body() createDto: ObjetivoCreateDto) {
        return this.objetivoService.create(createDto, user.id);
    }

    @Patch(':id')
    @Auth()
    @ApiOperation({ summary: 'Actualizar un objetivo' })
    async update(
        @User() user: UsuarioEntity,
        @Param('id', ParseIntPipe) id: number,
        @Body() updateDto: ObjetivoUpdateDto,
    ) {
        return this.objetivoService.update(id, updateDto, user.id);
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
        return this.objetivoService.createType(dto);
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
        return this.objetivoService.addActivity(user.id, goalId, dto);
    }

    @Delete('actividades/:activityId')
    @Auth()
    @ApiOperation({ summary: 'Eliminar una actividad' })
    async removeActivity(@User() user: UsuarioEntity, @Param('activityId', ParseIntPipe) activityId: number) {
        return this.objetivoService.removeActivity(user.id, activityId);
    }
}


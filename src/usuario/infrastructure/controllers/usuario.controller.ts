import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put } from '@nestjs/common';
import { UsuarioService } from '../../application/services/usuario.service';
import { ProgresoService } from '../../application/services/progreso.service';
import { FindUsuariosDto } from '../dto/find-usuarios.dto';
import { UpdateUserDto } from '../../application/dtos/usuario-update.dto';
import { UsuarioCreateDto } from '../../application/dtos/usuario-create.dto';
import { UsuariosFindQuery } from '../../application/dtos/usuarios-find.query';
import { ProgresoCreateDto } from '../../application/dtos/progreso-create.dto';
import { Auth } from '../../../auth/infrastructure/decorators/auth.decorator';
import { Roles } from '../../domain/interfaces/roles';
import { User } from 'src/auth/infrastructure/decorators/user.decorator';
import { UsuarioEntity } from 'src/usuario/domain/entities/usuario.entity';
import { ProgresoEntity } from 'src/usuario/domain/entities/progreso.entity';

@Controller('usuario')
export class UsuarioController {
  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly progresoService: ProgresoService,
  ) { }

  @Post()
  create(@Body() createUserDto: UsuarioCreateDto) {
    const usuario = new UsuarioEntity(createUserDto);
    // password will be hashed in the service
    return this.usuarioService.create(usuario, createUserDto.password);
  }

  @Post('progreso')
  @Auth()
  createProgress(@User() user: UsuarioEntity, @Body() createUserDto: ProgresoCreateDto) {
    const entity = new ProgresoEntity({
      ...createUserDto,
      usuarioId: user.id,
    });
    return this.progresoService.create(entity);
  }

  @Get()
  findAll(@Query() q: FindUsuariosDto) {
    const query: UsuariosFindQuery = {
      email: q.email,
      isDeleted: q.isDeleted,
      limit: q.limit,
      offset: q.offset,
    };
    return this.usuarioService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuarioService.findOne(+id);
  }

  @Get('progreso/:id')
  findOneProgress(@Param('id') id: string) {
    return this.progresoService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const partial: Partial<UsuarioEntity> = {
      ...updateUserDto,
    };
    return this.usuarioService.update(+id, partial);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuarioService.delete(+id);
  }
}

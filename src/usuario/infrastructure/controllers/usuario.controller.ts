import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
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

@Controller('usuario')
export class UsuarioController {
  constructor(
    private readonly UsuarioService: UsuarioService,
    private readonly ProgresoService: ProgresoService,
  ) { }

  @Post()
  create(@Body() createUserDto: UsuarioCreateDto) {
    return this.UsuarioService.create(createUserDto);
  }

  @Post('progreso')
  @Auth(Roles.USUARIO)
  createProgress(@User() user: UsuarioEntity, @Body() createUserDto: ProgresoCreateDto) {
    return this.ProgresoService.create(createUserDto, user.id);
  }

  @Get()
  findAll(@Query() q: FindUsuariosDto) {
    const query: UsuariosFindQuery = {
      email: q.email,
      isDeleted: q.isDeleted,
      limit: q.limit,
      offset: q.offset,
    };
    return this.UsuarioService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.UsuarioService.findOne(+id);
  }

  @Get('progreso/:id')
  findOneProgress(@Param('id') id: string) {
    return this.ProgresoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.UsuarioService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.UsuarioService.delete(+id);
  }
}

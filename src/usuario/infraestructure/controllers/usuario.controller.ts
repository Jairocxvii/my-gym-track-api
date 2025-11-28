import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UsuarioService } from '../../aplication/services/usuario.service';
import { ProgresoService } from '../../aplication/services/progreso.service';
import { FindUsuariosDto } from '../dto/find-usuarios.dto';
import { UpdateUserDto } from 'src/ejercicio/infraestructure/dtos/update-user.dto';
import { UsuarioCreateDto } from 'src/usuario/aplication/dtos/usuario-create.dto';
import { UsuariosFindQuery } from '../../aplication/dtos/usuarios-find.query';
import { ProgresoCreateDto } from 'src/usuario/aplication/dtos/progreso-create.dto';


@Controller('usuario')
export class UsuarioController {
  constructor(private readonly UsuarioService: UsuarioService,
    private readonly ProgresoService: ProgresoService) { }

  @Post()
  create(@Body() createUserDto: UsuarioCreateDto) {
    return this.UsuarioService.create(createUserDto);
  }

  @Post('progreso')
  createProgress(@Body() createUserDto: ProgresoCreateDto) {
    return this.ProgresoService.create(createUserDto);
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

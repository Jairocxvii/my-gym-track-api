import { Inject, Injectable } from '@nestjs/common';
import { USUARIO_PORT, UsuarioPort } from 'src/usuario/domain/ports/usuario.port';
import { UsuarioApiMapper } from '../mappers/usuario-api.mapper';
import { UsuarioCreateDto } from '../dtos/usuario-create.dto';
import { UsuarioEntity } from 'src/usuario/domain/entities/usuario.entity';
import { UsuariosFindQuery } from '../dtos/usuarios-find.query';
import { HasherService } from '@common/utils/hasher.service';

@Injectable()
export class UsuarioService {
  constructor(
    @Inject(USUARIO_PORT)
    private readonly usuarioPort: UsuarioPort,
    private readonly hasherService: HasherService,
  ) { }

  async create(createUserDto: UsuarioCreateDto) {
    const usuario = new UsuarioEntity(createUserDto);
    usuario.passwordHash = await this.hasherService.hash(createUserDto.password);
    const usuarioCreado = await this.usuarioPort.create(usuario);
    return UsuarioApiMapper.toResponse(usuarioCreado);
  }

  async findAll(query: UsuariosFindQuery) {
    const usuarios = await this.usuarioPort.findAll({
      ...(query.isDeleted !== undefined && { isDeleted: query.isDeleted }),
      ...(query.email && { _like: { email: query.email } }),
      ...(query.limit && { _limit: query.limit }),
      ...(query.offset && { _offset: query.offset }),
      _order: { by: 'email', dir: 'ASC' },
    });
    return usuarios.map((usuario) => UsuarioApiMapper.toResponse(usuario));
  }

  async findOne(id: number) {

    const usuario = await this.usuarioPort.findOneById(id);
    if (!usuario) {
      throw new Error('Usuario no encontrado');
    }
    return UsuarioApiMapper.toResponse(usuario);
  }

  async update(id: number, updateUserDto: any) {
    const usuarioActualizado = await this.usuarioPort.update(id, updateUserDto);
    return UsuarioApiMapper.toResponse(usuarioActualizado);
  }

  async delete(id: number) {
    const usuario = await this.usuarioPort.findOneById(id);
    if (!usuario) {
      throw new Error('Usuario no encontrado');
    }
    usuario.isDeleted = true;
    await this.usuarioPort.update(id, usuario);
    return "Usuario eliminado correctamente";
  }
}

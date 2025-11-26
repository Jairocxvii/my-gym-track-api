import { Inject, Injectable } from '@nestjs/common';
import { USUARIO_PORT, UsuarioPort } from 'src/user/domain/ports/usuario.port';
import { UsuarioApiMapper } from '../mappers/usuario-api.mapper';
import { CreateUsuarioDto } from '../dtos/create-usuario.dto';
import { UsuarioEntity } from 'src/user/domain/entities/usuario.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject(USUARIO_PORT)
    private readonly usuarioPort: UsuarioPort
  ) { }

  async create(createUserDto: CreateUsuarioDto) {
    const usuario = new UsuarioEntity(createUserDto);
    const usuarioCreado = await this.usuarioPort.create(usuario);
    return UsuarioApiMapper.toResponse(usuarioCreado);
  }

  async findAll() {

    const usuarios = await this.usuarioPort.findAll();
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
    const usuario = await this.usuarioPort.findOneById(id);
    if (!usuario) {
      throw new Error('Usuario no encontrado');
    }
    const usuarioActualizado = await this.usuarioPort.update(id, updateUserDto);
    return UsuarioApiMapper.toResponse(usuarioActualizado);
  }

  async remove(id: number) {
    const usuario = await this.usuarioPort.remove(id);
    return UsuarioApiMapper.toResponse(usuario);
  }
}

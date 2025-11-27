import { Inject, Injectable } from '@nestjs/common';
import { USUARIO_PORT, UsuarioPort } from 'src/user/domain/ports/usuario.port';
import { UsuarioApiMapper } from '../mappers/usuario-api.mapper';
import { CreateUsuarioDto } from '../dtos/create-usuario.dto';
import { UsuarioEntity } from 'src/user/domain/entities/usuario.entity';
import { PasswordHasher } from 'src/user/domain/services/password-hasher';

@Injectable()
export class UserService {
  constructor(
    @Inject(USUARIO_PORT)
    private readonly usuarioPort: UsuarioPort,
    private readonly passwordHasher: PasswordHasher
  ) { }

  async create(createUserDto: CreateUsuarioDto) {
    const usuario = new UsuarioEntity(createUserDto);
    usuario.passwordHash = await this.passwordHasher.hash(createUserDto.password);
    const usuarioCreado = await this.usuarioPort.create(usuario);
    return UsuarioApiMapper.toResponse(usuarioCreado);
  }

  async findAll() {
    const email = '';
    const usuarios = await this.usuarioPort.findAll({
      isDeleted: false,
      _like: email ? { email } : undefined,
      _order: { by: 'email', dir: 'ASC' },
      _limit: 3,
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

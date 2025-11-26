import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../../infraestructure/dtos/create-user.dto';
import { UpdateUserDto } from '../../infraestructure/dtos/update-user.dto';
import { USUARIO_PORT, UsuarioPort } from 'src/user/domain/ports/usuario.port';


@Injectable()
export class UserService {
  /**
   *
   */
  constructor(
    @Inject(USUARIO_PORT)
    private readonly usuarioPort: UsuarioPort
  ) {


  }
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return this.usuarioPort.findAll();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}

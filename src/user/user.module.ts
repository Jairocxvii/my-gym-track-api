import { Module } from '@nestjs/common';
import { UserService } from './aplication/services/user.service';
import { UserController } from './infraestructure/controllers/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { USUARIO_PORT } from './domain/ports/usuario.port';
import { UsuarioAdapter } from './infraestructure/adapters/usuario.adapter';
import { Usuario } from './infraestructure/database/entities/usuario';
import { Preferencia } from './infraestructure/database/entities/preferencia';
import { Progreso } from './infraestructure/database/entities/progreso';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario, Preferencia, Progreso])],
  controllers: [UserController],
  providers: [
    {
      provide: USUARIO_PORT,
      useClass: UsuarioAdapter,
    },
    UserService,
  ],
})
export class UserModule { }

import { UsuarioEntity } from '../entities/usuario.entity';
import { GenericRepositoryPort } from './generic-repository.port';

export abstract class UsuarioPort extends GenericRepositoryPort<UsuarioEntity, number> {
  abstract findOneByEmail(mail: string): Promise<UsuarioEntity | null>;
  abstract updateRefreshToken(id: number, refreshToken: string): Promise<void>;
}

export const USUARIO_PORT = Symbol('USUARIO_PORT');

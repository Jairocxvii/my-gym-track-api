import { UsuarioEntity } from '../../../usuario/domain/entities/usuario.entity';

export abstract class AuthUsuarioRepositoryPort {
  abstract findByEmail(email: string): Promise<UsuarioEntity | null>;
  abstract updateRefreshToken(userId: number, hashedRefreshToken: string): Promise<void>;
  abstract findOne(id: number): Promise<UsuarioEntity | null>;
}

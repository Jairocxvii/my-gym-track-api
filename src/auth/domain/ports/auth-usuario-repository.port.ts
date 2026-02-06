import { UsuarioEntity } from '../../../usuario/domain/entities/usuario.entity';

export abstract class AuthUsuarioRepositoryPort {
  abstract findByEmail(email: string): Promise<UsuarioEntity | null>;
  abstract findByPhone(email: string): Promise<UsuarioEntity | null>;
  abstract updateRefreshToken(userId: number, hashedRefreshToken: string): Promise<void>;
  abstract updatePassword(userId: number, newPassword: string): Promise<void>;
  abstract updateRecoveryCode(userId: number, recoveryCode: string): Promise<void>;
  abstract findOne(id: number): Promise<UsuarioEntity | null>;
}

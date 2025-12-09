// Librerías externas
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial } from 'typeorm';

// Puertos del dominio
import { UsuarioPort } from 'src/usuario/domain/ports/usuario.port';
import { AuthUsuarioRepositoryPort } from 'src/auth/domain/ports/auth-usuario-repository.port';

// Entidades del dominio
import { UsuarioEntity } from 'src/usuario/domain/entities/usuario.entity';

// Adaptadores y utilidades comunes
import { GenericTypeOrmAdapter } from '@common/database/generic-typeorm.adapter';

// Entidades de base de datos
import { Usuario } from '../database/entities/usuario';

@Injectable()
export class UsuarioAdapter extends GenericTypeOrmAdapter<UsuarioEntity, Usuario, 'usuario_id'> implements UsuarioPort, AuthUsuarioRepositoryPort {
  protected primaryKeyName: 'usuario_id' = 'usuario_id';
  constructor(
    @InjectRepository(Usuario)
    repository: Repository<Usuario>,
  ) {
    super(repository);
  }

  protected toDomain(orm: Usuario): UsuarioEntity {
    const usuario = new UsuarioEntity({
      id: orm.usuario_id,
      nombre: orm.nombre,
      edad: orm.edad,
      sexo: orm.sexo,
      pesoKg: orm.peso_kg,
      alturaCm: orm.altura_cm,
      nivel: orm.nivel,
      condicionesMedicas: orm.condiciones_medicas,
      objetivos: orm.objetivos,
      email: orm.email,
      celular: orm.celular,
      passwordHash: orm.password_hash,
      rol: orm.rol,
      habeasDataAceptado: orm.habeas_data_aceptado,
      isDeleted: orm.is_deleted,
      isActivo: orm.is_activo,
      deletedAt: orm.deleted_at,
      refreshToken: orm.refresh_token,
      fechaHabeasData: orm.fecha_habeas_data,
    });
    return usuario;
  }

  protected toEntityDB(domain: UsuarioEntity): DeepPartial<Usuario> {
    return {
      usuario_id: domain.id,
      nombre: domain.nombre,
      edad: domain.edad,
      sexo: domain.sexo,
      peso_kg: domain.pesoKg,
      altura_cm: domain.alturaCm,
      nivel: domain.nivel,
      condiciones_medicas: domain.condicionesMedicas,
      objetivos: domain.objetivos,
      email: domain.email,
      celular: domain.celular,
      password_hash: domain.passwordHash,
      rol: domain.rol,
      habeas_data_aceptado: domain.habeasDataAceptado,
      is_deleted: domain.isDeleted,
      is_activo: domain.isActivo,
      deleted_at: domain.deletedAt,
      refresh_token: domain.refreshToken,
      fecha_habeas_data: domain.fechaHabeasData,
    };
  }

  protected toColumnName(prop: keyof UsuarioEntity): string {
    return USER_DOMAIN_TO_COLUMN[prop];
  }

  // Implement AuthUsuarioRepositoryPort
  findByEmail(email: string): Promise<UsuarioEntity | null> {
    return this.findOneByEmail(email);
  }

  findOne(id: number): Promise<UsuarioEntity | null> {
    return this.findOneById(id);
  }

  async findOneByEmail(mail: string): Promise<UsuarioEntity | null> {
    const item = await this.repository.findOneBy({ email: mail });
    if (!item) {
      return null;
    }
    return this.toDomain(item);
  }

  async updateRefreshToken(id: number, refreshToken: string): Promise<void> {
    await this.repository.update({ usuario_id: id }, { refresh_token: refreshToken, updated_at: new Date().toISOString() });
  }
}

export const USER_DOMAIN_TO_COLUMN: Record<keyof UsuarioEntity, string> = {
  id: 'usuario_id',
  email: 'email',
  passwordHash: 'password_hash',
  isDeleted: 'is_deleted',
  isActivo: 'is_activo',
  nombre: 'nombre',
  edad: 'edad',
  sexo: 'sexo',
  pesoKg: 'peso_kg',
  alturaCm: 'altura_cm',
  nivel: 'nivel',
  celular: 'celular',
  rol: 'rol',
  habeasDataAceptado: 'habeas_data_aceptado',
  condicionesMedicas: 'condiciones_medicas',
  objetivos: 'objetivos',
  refreshToken: 'refresh_token',
  fechaHabeasData: 'fecha_habeas_data',
  deletedAt: 'deleted_at',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
};

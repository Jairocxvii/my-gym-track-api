import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial } from 'typeorm';
import { UsuarioEntity } from 'src/user/domain/entities/usuario.entity';

import { UsuarioPort } from 'src/user/domain/ports/usuario.port';
import { GenericTypeOrmAdapter } from './generic-typeorm.adapter';
import { Usuario } from '../database/entities/usuario';

@Injectable()
export class UsuarioAdapter
    extends GenericTypeOrmAdapter<UsuarioEntity, Usuario, 'usuario_id'>
    implements UsuarioPort {
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
            deletedAt: orm.deleted_at,
            refreshToken: orm.refresh_token,
            fechaHabeasData: orm.fecha_habeas_data
        });



        return usuario;
    }

    protected toEntity(domain: UsuarioEntity): DeepPartial<Usuario> {
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
            deleted_at: domain.deletedAt,
            refresh_token: domain.refreshToken,
            fecha_habeas_data: domain.fechaHabeasData
        };
    }

    protected toColumnName(prop: keyof UsuarioEntity): string {
        return USER_DOMAIN_TO_COLUMN[prop];
    }
}

export const USER_DOMAIN_TO_COLUMN: Record<keyof UsuarioEntity, string> = {
    id: 'usuario_id',
    email: 'email',
    passwordHash: 'password_hash',
    isDeleted: 'is_deleted',
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
    updatedAt: 'updated_at'
}
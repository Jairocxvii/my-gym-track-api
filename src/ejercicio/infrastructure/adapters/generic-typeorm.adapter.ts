import { Repository, DeepPartial, FindOptionsWhere, ObjectLiteral } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

/**
 * Adaptador base genérico para TypeORM que implementa operaciones CRUD
 * siguiendo los principios de Arquitectura Hexagonal.
 * 
 * @template E - Entidad de DOMINIO
 * @template O - Entidad TypeORM (ORM)
 * @template K - Tipo de la Primary Key (number | string | UUID, etc.)
 */
export abstract class GenericTypeOrmAdapter<E, O extends ObjectLiteral, K = number> {
    constructor(protected readonly repository: Repository<O>) { }

    /* -------------- Métodos abstractos de mapeo -------------- */

    /**
     * Convierte una entidad de TypeORM a una entidad de dominio
     */
    protected abstract toDomain(orm: O): E;

    /**
     * Convierte una entidad de dominio a un formato parcial de TypeORM
     */
    protected abstract toEntity(domain: E): DeepPartial<O>;

    /* -------------- CRUD genérico -------------- */

    /**
     * Crea una nueva entidad en la base de datos
     */
    async create(domain: E): Promise<E> {
        const partial = this.toEntity(domain);
        const saved = await this.repository.save(partial);
        return this.toDomain(saved as O);
    }

    /**
     * Crea múltiples entidades en una sola operación
     */
    async createMany(domains: E[]): Promise<E[]> {
        const partials = domains.map((d) => this.toEntity(d));
        const saved = await this.repository.save(partials);
        return saved.map((o) => this.toDomain(o as O));
    }

    /**
     * Obtiene todas las entidades
     */
    async findAll(): Promise<E[]> {
        const list = await this.repository.find();
        return list.map((o) => this.toDomain(o));
    }

    /**
     * Busca una entidad por su ID
     * @returns La entidad de dominio o null si no existe
     */
    async findOneById(id: K): Promise<E | null> {
        const found = await this.repository.findOneBy({
            id
        } as FindOptionsWhere<O>);

        return found ? this.toDomain(found) : null;
    }

    /**
     * Busca una entidad por su ID y lanza excepción si no existe
     * @throws NotFoundException
     */
    async findOneByIdOrFail(id: K): Promise<E> {
        const entity = await this.findOneById(id);

        if (!entity) {
            throw new NotFoundException(
                `${this.repository.metadata.name} with id ${id} not found`
            );
        }

        return entity;
    }

    /**
     * Actualiza una entidad existente
     * @throws NotFoundException si la entidad no existe
     */
    async update(id: K, domain: E): Promise<E> {
        // Verificar que existe antes de actualizar
        await this.findOneByIdOrFail(id);

        const partial = this.toEntity(domain);
        await this.repository.update(id as any, partial as any);

        const updated = await this.repository.findOneBy({
            id
        } as FindOptionsWhere<O>);

        return this.toDomain(updated!);
    }

    /**
     * Actualiza parcialmente una entidad
     */
    async partialUpdate(id: K, partial: Partial<E>): Promise<E> {
        await this.findOneByIdOrFail(id);

        await this.repository.update(id as any, partial as any);

        const updated = await this.repository.findOneBy({
            id
        } as FindOptionsWhere<O>);

        return this.toDomain(updated!);
    }

    /**
     * Elimina una entidad por su ID
     * @returns La entidad eliminada
     * @throws NotFoundException si la entidad no existe
     */
    async remove(id: K): Promise<E> {
        const found = await this.findOneByIdOrFail(id);

        const ormEntity = await this.repository.findOneBy({
            id
        } as FindOptionsWhere<O>);

        await this.repository.remove(ormEntity!);

        return found;
    }

    /**
     * Elimina múltiples entidades
     */
    async removeMany(ids: K[]): Promise<E[]> {
        const entities = await Promise.all(
            ids.map((id) => this.findOneByIdOrFail(id))
        );

        const ormEntities = await this.repository.findBy({
            id: ids as any
        } as FindOptionsWhere<O>);

        await this.repository.remove(ormEntities);

        return entities;
    }

    /**
     * Verifica si existe una entidad con el ID dado
     */
    async exists(id: K): Promise<boolean> {
        const count = await this.repository.countBy({
            id
        } as FindOptionsWhere<O>);

        return count > 0;
    }

    /**
     * Cuenta el total de entidades
     */
    async count(): Promise<number> {
        return this.repository.count();
    }

    /**
     * Elimina todas las entidades (usar con precaución)
     */
    async clear(): Promise<void> {
        await this.repository.clear();
    }
}
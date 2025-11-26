import { Repository, DeepPartial, FindOptionsWhere, ObjectLiteral, FindManyOptions } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

/**
 * Adaptador base genérico para TypeORM que implementa operaciones CRUD
 * siguiendo los principios de Arquitectura Hexagonal.
 * * @template E - Entidad de DOMINIO
 * @template O - Entidad TypeORM (ORM)
 * @template K - Tipo de la Primary Key (number | string | UUID, etc.)
 */
export abstract class GenericTypeOrmAdapter<E, O extends ObjectLiteral, K = number> {
    constructor(protected readonly repository: Repository<O>) { }

    protected abstract primaryKeyName: keyof O;

    protected abstract toDomain(orm: O): E;


    protected abstract toEntity(domain: E): DeepPartial<O>;

    /* -------------- CRUD genérico -------------- */

    async create(domain: E): Promise<E> {
        const partial = this.toEntity(domain);
        const saved = await this.repository.save(partial);
        return this.toDomain(saved as O);
    }

    async createMany(domains: E[]): Promise<E[]> {
        const partials = domains.map((d) => this.toEntity(d));
        const saved = await this.repository.save(partials);
        return saved.map((o) => this.toDomain(o as O));
    }

    async findAll(): Promise<E[]> {
        const list = await this.repository.find();
        return list.map((o) => this.toDomain(o));
    }

    /**
     * Busca UNA entidad por criterios generales (WHERE).
     * @param where Criterios de búsqueda usando FindOptionsWhere de TypeORM
     * @returns La entidad de dominio o null si no existe
     */
    async findOneByWhere(where: FindOptionsWhere<O>): Promise<E | null> {
        const found = await this.repository.findOneBy(where);
        return found ? this.toDomain(found) : null;
    }

    /**
     * Busca MULTIPLES entidades por criterios generales (WHERE).
     * @param where Criterios de búsqueda usando FindOptionsWhere de TypeORM
     * @returns Un array de entidades de dominio
     */
    async findByWhere(where: FindOptionsWhere<O>): Promise<E[]> {
        const list = await this.repository.findBy(where);
        return list.map((o) => this.toDomain(o));
    }

    /**
     * Busca UNA entidad por criterios generales (WHERE) y lanza excepción si no existe.
     * @param where Criterios de búsqueda
     * @throws NotFoundException
     */
    async findOneByWhereOrFail(where: FindOptionsWhere<O>): Promise<E> {
        const entity = await this.findOneByWhere(where);

        if (!entity) {
            // No se puede inferir el ID, así que usamos un mensaje más general
            throw new NotFoundException(
                `${this.repository.metadata.name} not found by given criteria`,
            );
        }

        return entity;
    }

    async findOneById(id: K): Promise<E | null> {
        const whereClause: FindOptionsWhere<O> = {
            [this.primaryKeyName]: id,
        } as FindOptionsWhere<O>;

        return this.findOneByWhere(whereClause);
    }

    async findOneByIdOrFail(id: K): Promise<E> {
        const entity = await this.findOneById(id);

        if (!entity) {
            throw new NotFoundException(
                `${this.repository.metadata.name} with id ${id} not found`
            );
        }

        return entity;
    }

    async update(id: K, domain: E): Promise<E> {
        await this.findOneByIdOrFail(id);
        const partial = this.toEntity(domain);
        await this.repository.update(id as any, partial as any);
        const updated = await this.repository.findOneBy({
            id
        } as FindOptionsWhere<O>);

        return this.toDomain(updated!);
    }

    async partialUpdate(id: K, partial: Partial<E>): Promise<E> {
        await this.findOneByIdOrFail(id);
        await this.repository.update(id as any, partial as any);

        const updated = await this.repository.findOneBy({
            id
        } as FindOptionsWhere<O>);

        return this.toDomain(updated!);
    }

    async remove(id: K): Promise<E> {
        const found = await this.findOneByIdOrFail(id);

        const ormEntity = await this.repository.findOneBy({
            id
        } as FindOptionsWhere<O>);

        await this.repository.remove(ormEntity!);

        return found;
    }

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

    async exists(id: K): Promise<boolean> {
        const count = await this.repository.countBy({
            id
        } as FindOptionsWhere<O>);

        return count > 0;
    }

    async count(): Promise<number> {
        return this.repository.count();
    }

    async clear(): Promise<void> {
        await this.repository.clear();
    }
}
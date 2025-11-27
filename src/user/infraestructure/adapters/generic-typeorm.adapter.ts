import { NotFoundException } from "@nestjs/common";
import { Between, DeepPartial, FindManyOptions, FindOptionsWhere, In, Like, ObjectLiteral, Repository } from "typeorm";
import { Query } from "./query.types";

export abstract class GenericTypeOrmAdapter<
    E,
    O extends ObjectLiteral,
    PK extends keyof O
> {
    constructor(protected readonly repository: Repository<O>) { }

    protected abstract primaryKeyName: PK;

    protected abstract toDomain(orm: O): E;

    protected abstract toEntity(domain: E): DeepPartial<O>;

    protected abstract toColumnName(prop: keyof E): string;

    /* -------------- CRUD -------------- */

    async create(domain: E): Promise<E> {
        const partial = this.toEntity(domain);
        const saved = await this.repository.save(partial);
        return this.toDomain(saved as O);
    }

    async createMany(domains: E[]): Promise<E[]> {
        const saved = await this.repository.save(domains.map(this.toEntity));
        return saved.map((o) => this.toDomain(o as O));
    }

    async findAll(query?: Query<E>): Promise<E[]> {
        const opts = this.buildFindManyOptions(query);
        const rows = await this.repository.find(opts);
        return rows.map((o) => this.toDomain(o));
    }

    async count(query?: Query<E>): Promise<number> {
        const opts = this.buildFindManyOptions(query);
        return this.repository.count(opts);
    }

    async findOneByWhere(where: FindOptionsWhere<O>): Promise<E | null> {
        const found = await this.repository.findOneBy(where);
        return found ? this.toDomain(found) : null;
    }

    async findOneByWhereOrFail(where: FindOptionsWhere<O>): Promise<E> {
        const e = await this.findOneByWhere(where);
        if (!e) {
            throw new NotFoundException(`${this.repository.metadata.name} not found`);
        }
        return e;
    }

    async findOneById(id: O[PK]): Promise<E | null> {
        return this.findOneByWhere({
            [this.primaryKeyName]: id,
        } as FindOptionsWhere<O>);
    }

    async findOneByIdOrFail(id: O[PK]): Promise<E> {
        const e = await this.findOneById(id);
        if (!e) {
            throw new NotFoundException(
                `${this.repository.metadata.name} with ${String(this.primaryKeyName)}=${id} not found`,
            );
        }
        return e;
    }

    async update(id: O[PK], domain: E): Promise<E> {
        await this.findOneByIdOrFail(id);

        await this.repository.update(
            { [this.primaryKeyName]: id } as FindOptionsWhere<O>,
            this.toEntity(domain) as any
        );

        const updated = await this.repository.findOneBy({
            [this.primaryKeyName]: id,
        } as FindOptionsWhere<O>);

        return this.toDomain(updated!);
    }

    async partialUpdate(id: O[PK], partial: Partial<E>): Promise<E> {
        await this.findOneByIdOrFail(id);

        await this.repository.update(
            { [this.primaryKeyName]: id } as any,
            partial as any,
        );

        const updated = await this.repository.findOneBy({
            [this.primaryKeyName]: id,
        } as any);

        return this.toDomain(updated!);
    }

    async delete(id: O[PK]): Promise<E> {
        const found = await this.findOneByIdOrFail(id);

        const orm = await this.repository.findOneBy({
            [this.primaryKeyName]: id,
        } as any);

        await this.repository.remove(orm!);

        return found;
    }

    async deleteMany(ids: O[PK][]): Promise<E[]> {
        const entities = await Promise.all(ids.map((id) => this.findOneByIdOrFail(id)));

        const ormEntities = await this.repository.findBy({
            [this.primaryKeyName]: ids as any,
        } as any);

        await this.repository.remove(ormEntities);

        return entities;
    }

    async exists(id: O[PK]): Promise<boolean> {
        const count = await this.repository.countBy({
            [this.primaryKeyName]: id,
        } as any);

        return count > 0;
    }

    async clear(): Promise<void> {
        await this.repository.clear();
    }

    private buildFindManyOptions(q?: Query<E>): FindManyOptions<O> {
        if (!q) return {};

        const where: any = {};
        const order: any = {};
        let take: number | undefined;
        let skip: number | undefined;

        /* igualdad o IN */
        for (const [k, v] of Object.entries(q)) {
            if (k.startsWith('_')) continue;
            const col = this.toColumnName(k as keyof E); // ← traducción
            if (Array.isArray(v)) where[col] = In(v);
            else where[col] = v;
        }

        /* LIKE */
        if (q._like) {
            for (const [k, v] of Object.entries(q._like)) where[k] = Like(`%${v}%`);
        }

        /* rangos */
        if (q._range) {
            for (const [k, v] of Object.entries(q._range)) {
                const { from, to } = v as { from: any; to: any }; // <-- aquí
                where[k] = Between(from, to);
            }
        }

        /* orden */
        if (q._order) order[q._order.by as string] = q._order.dir;

        /* paginación */
        if (q._limit) take = q._limit;
        if (q._offset) skip = q._offset;

        return { where, order, take, skip };
    }

}

export type Query<E> = {
    [P in keyof E]?: E[P] | E[P][];
} & {
    /** Para rangos, paginación, etc. */
    _range?: Partial<Record<keyof E, { from: any; to: any }>>;
    /** Para LIKE / ILIKE (el repo concreto decide) */
    _like?: Partial<Record<keyof E, string>>;
    /** Ordenación */
    _order?: { by: keyof E; dir: 'ASC' | 'DESC' };
    /** Límite / offset */
    _limit?: number;
    _offset?: number;
};

export abstract class GenericRepositoryPort<E, K> {
    // CRUD básico
    abstract create(entity: E): Promise<E>;
    abstract findAll(query?: Query<E>): Promise<E[]>;
    abstract findOneById(id: K): Promise<E | null>;
    abstract update(id: K, entity: E): Promise<E>;
    abstract delete(id: K): Promise<E>;

    // Métodos adicionales 
    abstract createMany(entities: E[]): Promise<E[]>;
    abstract findOneByIdOrFail(id: K): Promise<E>;
    abstract partialUpdate(id: K, partial: Partial<E>): Promise<E>;
    abstract exists(id: K): Promise<boolean>;
    abstract count(query?: Query<E>): Promise<number>;
    abstract deleteMany(ids: K[]): Promise<E[]>;
    abstract clear(): Promise<void>;
}
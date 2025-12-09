export abstract class GenericRepositoryPort<E, K> {
  abstract create(entity: E): Promise<E>;
  abstract findAll(): Promise<E[]>;
  abstract findOneById(id: K): Promise<E | null>;
  abstract update(id: K, entity: E): Promise<E>;
  abstract remove(id: K): Promise<E>;
}

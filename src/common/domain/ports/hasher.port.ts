export const HASHER_PORT = 'HASHER_PORT';

export abstract class HasherPort {
  abstract hash(plain: string): Promise<string>;
  abstract compare(plain: string, hash: string): Promise<boolean>;
}

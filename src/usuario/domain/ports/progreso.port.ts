import { ProgresoEntity } from '../entities/progreso.entity';
import { GenericRepositoryPort } from './generic-repository.port';

export abstract class ProgresoPort extends GenericRepositoryPort<ProgresoEntity, number> {}

export const PROGRESO_PORT = Symbol('PROGRESO_PORT');

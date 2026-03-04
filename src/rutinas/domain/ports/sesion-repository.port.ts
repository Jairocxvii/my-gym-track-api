import { GenericRepositoryPort } from './generic-repository.port';
import { SesionEntity } from '../entities/sesion.entity';

export abstract class SesionRepositoryPort extends GenericRepositoryPort<SesionEntity, number> { }

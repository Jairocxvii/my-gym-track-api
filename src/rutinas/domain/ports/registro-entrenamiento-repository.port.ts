import { GenericRepositoryPort } from './generic-repository.port';
import { RegistroEntrenamientoEntity } from '../entities/registro-entrenamiento.entity';

export abstract class RegistroEntrenamientoRepositoryPort extends GenericRepositoryPort<RegistroEntrenamientoEntity, number> { }

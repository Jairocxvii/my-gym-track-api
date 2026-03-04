import { GenericRepositoryPort } from './generic-repository.port';
import { EjercicioEntity } from '../entities/ejercicio.entity';

export abstract class EjercicioRepositoryPort extends GenericRepositoryPort<EjercicioEntity, number> { }

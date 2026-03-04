import { GenericRepositoryPort } from './generic-repository.port';
import { SesionEjercicioEntity } from '../entities/sesion-ejercicio.entity';

export abstract class SesionEjercicioRepositoryPort extends GenericRepositoryPort<SesionEjercicioEntity, number> { }

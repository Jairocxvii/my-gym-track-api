import { GenericRepositoryPort } from './generic-repository.port';
import { RutinaEntity } from '../entities/rutina.entity';

export abstract class RutinaRepositoryPort extends GenericRepositoryPort<RutinaEntity, number> { }

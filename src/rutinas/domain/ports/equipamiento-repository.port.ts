import { GenericRepositoryPort } from './generic-repository.port';
import { EquipamientoEntity } from '../entities/equipamiento.entity';

export abstract class EquipamientoRepositoryPort extends GenericRepositoryPort<EquipamientoEntity, number> { }

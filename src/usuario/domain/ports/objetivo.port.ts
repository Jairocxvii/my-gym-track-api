import { ObjetivoEntity } from '../entities/objetivo.entity';
import { GenericRepositoryPort } from './generic-repository.port';
import { TipoObjetivoEntity } from '../entities/tipo-objetivo.entity';
import { ActividadEntity } from '../entities/actividad.entity';
import { UnidadMedidaEntity } from '../entities/unidad-medida.entity';

export const OBJETIVO_PORT = 'OBJETIVO_PORT';

export abstract class ObjetivoPort extends GenericRepositoryPort<ObjetivoEntity, number> {
    abstract findTypes(): Promise<TipoObjetivoEntity[]>;
    abstract createType(type: TipoObjetivoEntity): Promise<TipoObjetivoEntity>;
    abstract findUnits(): Promise<UnidadMedidaEntity[]>;
    abstract findActivitiesByGoalId(usuarioId: number, goalId: number): Promise<ActividadEntity[]>;
    abstract findActivities(usuarioId: number): Promise<ActividadEntity[]>;
    abstract addActivity(usuarioId: number, activity: ActividadEntity): Promise<ActividadEntity>;
    abstract removeActivity(usuarioId: number, activityId: number): Promise<void>;
}

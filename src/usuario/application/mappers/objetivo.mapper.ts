import { ObjetivoEntity } from '../../domain/entities/objetivo.entity';
import { ActividadEntity } from '../../domain/entities/actividad.entity';
import { TipoObjetivoEntity } from '../../domain/entities/tipo-objetivo.entity';
import { UnidadMedidaEntity } from '../../domain/entities/unidad-medida.entity';

export class ObjetivoMapper {
    static toResponse(objetivo: ObjetivoEntity) {
        return {
            id: objetivo.id,
            tipoObjetivoId: objetivo.tipoObjetivoId,
            tipoObjetivo: objetivo.tipoObjetivoNombre,
            unidadMedida: objetivo.unidadMedidaNombre,
            nombrePersonalizado: objetivo.nombrePersonalizado,
            valorMetaTotal: objetivo.valorMetaTotal,
            fechaInicio: objetivo.fechaInicio,
            fechaLimite: objetivo.fechaLimite,
            completado: objetivo.completado,
        };
    }

    static actividadToResponse(actividad: ActividadEntity) {
        return {
            id: actividad.id,
            objetivoId: actividad.objetivoId,
            nombreObjetivo: actividad.nombreObjetivo,
            usuarioId: actividad.usuarioId,
            unidadMedidaId: actividad.unidadMedidaId,
            unidadMedida: actividad.unidadMedidaNombre,
            nombre: actividad.nombre,
            descripcion: actividad.descripcion,
            valorEspecifico: actividad.valorEspecifico,
            createdAt: actividad.createdAt,
        };
    }

    static tipoToResponse(tipo: TipoObjetivoEntity) {
        return {
            id: tipo.id,
            nombre: tipo.nombre,
            unidadMedidaId: tipo.unidadMedidaId,
        };
    }

    static unidadToResponse(unidad: UnidadMedidaEntity) {
        return {
            id: unidad.id,
            nombre: unidad.nombre,
            abreviatura: unidad.abreviatura,
        };
    }
}

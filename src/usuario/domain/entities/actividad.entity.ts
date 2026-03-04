export class ActividadEntity {
    id: number;
    objetivoId: number;
    usuarioId: number;
    unidadMedidaId: number;
    nombre: string;
    descripcion: string;
    valorEspecifico: number;
    createdAt?: Date;
    isDeleted: boolean;
    deletedAt?: Date;
    isActivo: boolean;
    nombreObjetivo?: string;
    unidadMedidaNombre?: string;

    constructor(props: Partial<ActividadEntity>) {
        Object.assign(this, props);
    }
}


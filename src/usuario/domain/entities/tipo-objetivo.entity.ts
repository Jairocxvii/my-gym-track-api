export class TipoObjetivoEntity {
    id: number;
    nombre: string;
    unidadMedidaId: number;
    isDeleted: boolean;
    deletedAt?: Date;
    isActivo: boolean;

    constructor(props: Partial<TipoObjetivoEntity>) {
        Object.assign(this, props);
    }
}


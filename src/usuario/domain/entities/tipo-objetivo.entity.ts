export class TipoObjetivoEntity {
    id: number;
    nombre: string;
    unidadMedidaId: number;

    constructor(props: Partial<TipoObjetivoEntity>) {
        Object.assign(this, props);
    }
}


export class ObjetivoEntity {
    id: number;
    usuarioId: number;
    tipoObjetivoId: number;
    nombrePersonalizado: string;
    valorMetaTotal: number;
    fechaInicio: Date;
    fechaLimite: Date;
    completado: boolean;
    tipoObjetivoNombre?: string;
    unidadMedidaNombre?: string;

    constructor(props: Partial<ObjetivoEntity>) {
        Object.assign(this, props);
    }
}


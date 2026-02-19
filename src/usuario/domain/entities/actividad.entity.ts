export class ActividadEntity {
    id: number;
    objetivoId: number;
    usuarioId: number;
    unidadMedidaId: number;
    nombre: string;
    descripcion: string;
    valorEspecifico: number;
    createdAt?: Date;

    constructor(props: Partial<ActividadEntity>) {
        Object.assign(this, props);
    }
}


export class UnidadMedidaEntity {
    id: number;
    nombre: string;
    abreviatura: string;

    constructor(props: Partial<UnidadMedidaEntity>) {
        Object.assign(this, props);
    }
}

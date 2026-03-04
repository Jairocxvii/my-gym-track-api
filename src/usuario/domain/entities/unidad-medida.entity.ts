export class UnidadMedidaEntity {
    id: number;
    nombre: string;
    abreviatura: string;
    isDeleted: boolean;
    deletedAt?: Date;
    isActivo: boolean;

    constructor(props: Partial<UnidadMedidaEntity>) {
        Object.assign(this, props);
    }
}

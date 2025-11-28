export class ProgresoEntity {

    id: number;
    usuarioId: number;
    fecha: Date;
    pesoKg?: number;
    medidas?: Record<string, any>;
    notas?: string;
    creadoEn: Date;



    constructor(props: Partial<ProgresoEntity>) {
        Object.assign(this, props);
    }
}

export class ProgresoEntity {
    constructor(
        public id: number,
        public usuarioId: number,
        public fecha: Date,
        public pesoKg?: number,
        public medidas?: Record<string, any>,
        public notas?: string
    ) { }
}

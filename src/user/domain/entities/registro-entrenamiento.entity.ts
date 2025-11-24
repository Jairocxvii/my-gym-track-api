export class RegistroEntrenamientoEntity {
    constructor(
        public id: number,
        public usuarioId: number,
        public sesionId: number,
        public sesionEjercicioId: number,
        public fecha: Date,
        public seriesRealizadas: number,
        public repeticionesRealizadas: number,
        public pesoUtilizadoKg: number
    ) { }
}

export class UsuarioEntity {
    constructor(
        public id: number,
        public nombre: string,
        public edad: number,
        public sexo: string,
        public pesoKg: number,
        public alturaCm: number,
        public nivel: string,
        public condicionesMedicas?: string,
        public objetivos?: string
    ) { }
}

export class EjercicioEntity {
    constructor(
        public id: number | undefined,
        public nombre: string,
        public categoria?: string,
        public musculoPrincipal?: string,
        public isDeleted: boolean = false,
        public deletedAt?: Date,
        public isActivo: boolean = true,
    ) { }
}

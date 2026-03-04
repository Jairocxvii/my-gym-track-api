export class EquipamientoEntity {
    constructor(
        public id: number | undefined,
        public descripcion: string,
        public isDeleted: boolean = false,
        public deletedAt?: Date,
        public isActivo: boolean = true,
    ) { }
}

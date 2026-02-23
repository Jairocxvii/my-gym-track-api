export class SesionEntity {
  constructor(
    public id: number,
    public rutinaId: number,
    public nombre: string,
    public diaOrden: number,
    public isDeleted: boolean = false,
    public deletedAt?: Date,
    public isActivo: boolean = true,
  ) { }
}

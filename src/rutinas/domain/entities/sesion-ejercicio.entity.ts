export class SesionEjercicioEntity {
  constructor(
    public id: number,
    public sesionId: number,
    public ejercicioId: number,
    public orden: number,
    public series: number,
    public repeticiones: number,
    public descansoSeg: number,
    public isDeleted: boolean = false,
    public deletedAt?: Date,
    public isActivo: boolean = true,
  ) { }
}

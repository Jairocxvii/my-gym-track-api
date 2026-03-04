export class RutinaEntity {
  constructor(
    public id: number | undefined,
    public usuarioId: number,
    public nombre?: string,
    public fechaCreacion?: Date,
    public tipoDivision?: string,
    public isDeleted: boolean = false,
    public deletedAt?: Date,
    public isActivo: boolean = true,
  ) { }
}

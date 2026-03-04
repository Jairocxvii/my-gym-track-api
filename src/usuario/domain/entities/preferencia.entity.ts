export class PreferenciaEntity {
  constructor(
    public id: number,
    public usuarioId: number,
    public ejerciciosFavoritos?: string,
    public ejerciciosAEvitar?: string,
    public isDeleted: boolean = false,
    public deletedAt?: Date,
    public isActivo: boolean = true,
  ) { }
}

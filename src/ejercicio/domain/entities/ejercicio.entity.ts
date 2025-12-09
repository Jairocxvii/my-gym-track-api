export class EjercicioEntity {
  constructor(
    public id: number,
    public nombre: string,
    public categoria?: string,
    public musculoPrincipal?: string,
  ) {}
}

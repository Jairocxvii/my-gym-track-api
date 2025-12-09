export class UsuarioResponseDto {
  id: number;
  nombre: string;
  edad: number;
  sexo: string;
  pesoKg: number;
  alturaCm: number;
  nivel: string;
  email: string;
  celular: string;

  condicionesMedicas?: string;
  objetivos?: string;
  isActivo: boolean;

  creadoEn?: Date;
  actualizadoEn?: Date;
}

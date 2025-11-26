export class CreateUsuarioDto {
    nombre: string;
    edad: number;
    sexo: string;
    pesoKg: number;
    alturaCm: number;
    nivel: string;
    email: string;
    celular?: string;
    password: string; // el hash se genera en el caso de uso

    condicionesMedicas?: string;
    objetivos?: string;
}
import { IsDate, IsNumber, IsString } from "class-validator";

export class CreateEjercicioDto {
    @IsString()
    nombre: string;
    @IsString()
    categoria?: string;
    @IsString()
    musculoPrincipal?: string;
}

export class CreateEquipamientoDto {
    @IsString()
    descripcion: string;
}

export class CreateRutinaDto {
    @IsString()
    nombre: string;
    @IsString()
    tipoDivision: string;
}

export class CreateSesionDto {
    @IsNumber()
    rutinaId: number;
    @IsString()
    nombre: string;
    @IsNumber()
    diaOrden: number;
}

export class CreateSesionEjercicioDto {
    @IsNumber()
    sesionId: number;
    @IsNumber()
    ejercicioId: number;
    @IsNumber()
    orden: number;
    @IsNumber()
    series: number;
    @IsNumber()
    repeticiones: number;
    @IsNumber()
    descansoSeg: number;
}

export class CreateRegistroEntrenamientoDto {
    @IsNumber()
    @IsNumber()
    usuarioId: number;
    @IsNumber()
    sesionId: number;
    @IsNumber()
    sesionEjercicioId: number;
    @IsDate()
    fecha?: Date;
    @IsNumber()
    seriesRealizadas: number;
    @IsNumber()
    repeticionesRealizadas: number;
    @IsNumber()
    pesoUtilizadoKg: number;
}

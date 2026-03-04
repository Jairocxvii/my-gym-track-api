import { IsString, IsDateString, IsOptional, IsNumber, IsBoolean } from 'class-validator';

export class ObjetivoCreateDto {
    @IsNumber()
    tipoObjetivoId: number;

    @IsString()
    nombrePersonalizado: string;

    @IsNumber()
    valorMetaTotal: number;

    @IsDateString()
    fechaInicio: string;

    @IsDateString()
    fechaLimite: string;

    @IsOptional()
    completado?: boolean;
}

export class ObjetivoUpdateDto {
    @IsOptional()
    @IsNumber()
    tipoObjetivoId?: number;

    @IsOptional()
    @IsString()
    nombrePersonalizado?: string;

    @IsOptional()
    @IsNumber()
    valorMetaTotal?: number;

    @IsOptional()
    @IsDateString()
    fechaInicio?: string;

    @IsOptional()
    @IsDateString()
    fechaLimite?: string;

    @IsOptional()
    @IsBoolean()
    completado?: boolean;
}


export class ActividadCreateDto {
    @IsNumber()
    unidadMedidaId: number;

    @IsString()
    nombre: string;

    @IsOptional()
    @IsString()
    descripcion?: string;

    @IsNumber()
    valorEspecifico: number;
}

export class TipoObjetivoDto {
    @IsString()
    nombre: string;

    @IsNumber()
    unidadMedidaId: number;
}

export class UnidadMedidaDto {
    @IsString()
    nombre: string;

    @IsOptional()
    @IsString()
    abreviatura?: string;
}


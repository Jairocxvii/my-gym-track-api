import { IsInt, IsOptional, IsDateString, IsNumber, Min, IsObject, IsString, IsDate } from 'class-validator';

export class ProgresoCreateDto {

  @IsOptional()
  @IsDate({ message: 'fecha debe ser una fecha válida (YYYY-MM-DD)' })
  fecha?: Date;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 }, { message: 'peso_kg debe ser un número con máximo 2 decimales' })
  @Min(0.01, { message: 'peso_kg debe ser mayor a 0' })
  pesoKg?: number;

  @IsOptional()
  @IsObject({ message: 'medidas debe ser un objeto JSON válido' })
  medidas?: Record<string, any>;

  @IsOptional()
  @IsString({ message: 'notas debe ser texto' })
  notas?: string;
}

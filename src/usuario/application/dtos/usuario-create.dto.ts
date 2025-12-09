import { IsBoolean, IsEmail, IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Max, Min, MinLength } from 'class-validator';

export class UsuarioCreateDto {
  @IsString({ message: 'nombre debe ser texto' })
  @IsNotEmpty({ message: 'nombre es obligatorio' })
  nombre!: string;

  @IsInt({ message: 'edad debe ser un número entero' })
  @Min(1, { message: 'edad mínima 1 año' })
  @Max(120, { message: 'edad máxima 120 años' })
  edad!: number;

  @IsEnum(['M', 'F', 'O'], { message: 'sexo debe ser M, F u O' })
  sexo!: 'M' | 'F' | 'O';

  @IsNumber({ maxDecimalPlaces: 2 }, { message: 'peso debe ser número' })
  @IsPositive({ message: 'peso debe ser positivo' })
  @Max(500, { message: 'peso máximo 500 kg' })
  pesoKg!: number;

  @IsNumber({ maxDecimalPlaces: 2 }, { message: 'altura debe ser número' })
  @Min(30, { message: 'altura mínima 30 cm' })
  @Max(300, { message: 'altura máxima 300 cm' })
  alturaCm!: number;

  @IsString({ message: 'nivel debe ser texto' })
  @IsNotEmpty({ message: 'nivel es obligatorio' })
  nivel!: string;

  @IsEmail({}, { message: 'email debe tener formato válido' })
  email!: string;

  @IsOptional()
  @IsString({ message: 'celular debe ser texto' })
  celular?: string;

  @IsString({ message: 'password debe ser texto' })
  @MinLength(6, { message: 'password mínimo 6 caracteres' })
  password!: string;

  @IsOptional()
  @IsString({ message: 'condicionesMedicas debe ser texto' })
  condicionesMedicas?: string;

  @IsOptional()
  @IsString({ message: 'objetivos debe ser texto' })
  objetivos?: string;

  @IsOptional()
  @IsBoolean({ message: 'isActivo debe ser booleano' })
  isActivo?: boolean;
}

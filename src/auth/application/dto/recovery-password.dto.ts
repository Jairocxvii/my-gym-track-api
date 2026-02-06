import { IsNotEmpty, IsString, IsEnum, IsOptional } from "class-validator";

enum typeRecovery {
    Email = 'email',
    Phone = 'phone'
}

export class RecoveryPasswordDto {
    @IsString()
    @IsNotEmpty()
    data: string;

    @IsNotEmpty()
    @IsEnum(typeRecovery)
    type: typeRecovery;

    @IsOptional()
    @IsString()
    code?: string;
}



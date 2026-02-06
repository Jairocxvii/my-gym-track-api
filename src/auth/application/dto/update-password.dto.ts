import { IsNotEmpty, IsString } from "class-validator";

export class UpdatePasswordDto {
    @IsString()
    @IsNotEmpty()
    token: string;

    @IsNotEmpty()
    @IsString()
    newPassword: string;
}



import { IsBoolean, IsEmail, IsOptional } from "class-validator";
import { PaginationDto } from "../../../common/database/pagination.dto";

export class FindUsuariosDto extends PaginationDto {
    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsBoolean()
    isDeleted?: boolean;
}
import { PartialType } from '@nestjs/mapped-types';
import { UsuarioCreateDto } from './usuario-create.dto';

export class UpdateUserDto extends PartialType(UsuarioCreateDto) {}

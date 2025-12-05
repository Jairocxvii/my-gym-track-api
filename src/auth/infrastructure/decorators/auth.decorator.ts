import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/usuario/domain/interfaces/roles';
import { RoleProtected } from './roles.decorator';
import { RolesGuard } from '../guards/roles.guard';

export function Auth(...roles: Roles[]) {
  return applyDecorators(RoleProtected(...roles), UseGuards(AuthGuard('jwt'), RolesGuard));
}

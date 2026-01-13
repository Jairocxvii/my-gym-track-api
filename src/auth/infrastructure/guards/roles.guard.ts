import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { META_ROLES } from '../decorators/roles.decorator';
import { UsuarioEntity } from 'src/usuario/domain/entities/usuario.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) { }

  canActivate(context: ExecutionContext): boolean {
    const validRoles: string[] = this.reflector.get(META_ROLES, context.getHandler());

    if (!validRoles) return true;
    if (validRoles.length === 0) return true;

    const req = context.switchToHttp().getRequest();
    const user = req.user as UsuarioEntity;

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    //if (validRoles.includes(user.rol)) {
    return true;
    //}

    throw new UnauthorizedException(`User ${user.nombre} need a valid role`);
  }
}

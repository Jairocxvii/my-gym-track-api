import { forwardRef, Inject } from "@nestjs/common";
import { AuthUsuarioRepositoryPort } from "src/auth/domain/ports/auth-usuario-repository.port";
import { UsuarioService } from "src/usuario/application/services/usuario.service";
import { UsuarioEntity } from "src/usuario/domain/entities/usuario.entity";

export class AuthUsuarioRepositoryAdapter implements AuthUsuarioRepositoryPort {



    constructor(
        // 2. Aquí está la corrección:
        @Inject(forwardRef(() => UsuarioService))
        private usuarioService: UsuarioService
    ) { }
    findByEmail(email: string): Promise<UsuarioEntity | null> {
        return this.usuarioService.findByEmail(email);
    }
    updateRefreshToken(userId: number, hashedRefreshToken: string): Promise<void> {
        return this.usuarioService.updateRefreshToken(userId, hashedRefreshToken);
    }
    findOne(id: number): Promise<UsuarioEntity | null> {
        return this.usuarioService.findOne(id);
    }



}
import { Injectable, UnauthorizedException } from "@nestjs/common";

import { Payload } from "../interfaces/payload.interface";

import { HasherService } from '@common/utils/hasher.service';
import { RefreshDto } from "../dto/refresh.dto";
import { TokenServicesPort } from "src/auth/domain/ports/token-services.port";
import { AuthUsuarioRepositoryPort } from "src/auth/domain/ports/auth-usuario-repository.port";
@Injectable()
export class AuthService {
    constructor(
        private authUsuarioRepositoryPort: AuthUsuarioRepositoryPort,
        private hasherService: HasherService,
        private tokenServices: TokenServicesPort
    ) { }

    async login(email: string, password: string) {
        const usuario = await this.authUsuarioRepositoryPort.findByEmail(email);

        if (!usuario) throw new UnauthorizedException('Invalid credentials');
        //TO DO 
        //if (!usuario.isActive) throw new UnauthorizedException('User inactive');

        const isValid = await this.hasherService.compare(password, usuario.passwordHash);
        if (!isValid) throw new UnauthorizedException('Invalid credentials');
        const payload: Payload = {
            id: usuario.id.toString(),
            email: usuario.email,
            name: usuario.nombre,
            role: usuario.rol,
        };
        var token = this.tokenServices.generateToken(payload);
        var refreshToken = this.tokenServices.generateRefreshToken(payload);
        this.authUsuarioRepositoryPort.updateRefreshToken(usuario.id, refreshToken);
        return { token, refreshToken };

    }
    async refresh(refreshToken: RefreshDto) {
        try {
            const payload = this.tokenServices.verifyRefreshToken(refreshToken.refresh_token);
            if (!payload)
                throw new UnauthorizedException('Invalid refresh token');
            const usuario = await this.authUsuarioRepositoryPort.findOne(parseInt(payload.id));
            // TO DO VAlidar refresh token con BD

            if (!usuario) throw new UnauthorizedException('Invalid refresh token');
            //TO DO
            /*if (!usuario.isActive)
                throw new UnauthorizedException('User inactive');*/

            //TO DO

            const usuarioPayload: Payload = {
                id: usuario.id.toString(),
                email: usuario.email,
                name: usuario.nombre,
                role: usuario.rol,
            };
            var token = this.tokenServices.generateToken(usuarioPayload);
            var newRefreshToken = this.tokenServices.generateRefreshToken(usuarioPayload);
            this.authUsuarioRepositoryPort.updateRefreshToken(usuario.id, newRefreshToken);
            return { token, newRefreshToken };

        } catch (err) {
            throw new UnauthorizedException('Invalid refresh token');
        }
    }


}
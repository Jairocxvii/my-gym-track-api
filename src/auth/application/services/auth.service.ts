import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { JwtPayload } from "../interfaces/jwt-payload.interface";
import { UsuarioService } from "src/usuario/application/services/usuario.service";
import { HasherService } from '@common/utils/hasher.service';
import { RefreshDto } from "../dto/refresh.dto";
@Injectable()
export class AuthService {
    constructor(
        private configService: ConfigService,
        private jwtService: JwtService,
        private usuarioService: UsuarioService,
        private hasherService: HasherService
    ) { }







    async login(email: string, password: string) {
        const user = await this.usuarioService.findByEmail(email);

        if (!user) throw new UnauthorizedException('Invalid credentials');
        //TO DO 
        //if (!user.isActive) throw new UnauthorizedException('User inactive');

        const isValid = await this.hasherService.compare(password, user.passwordHash);
        if (!isValid) throw new UnauthorizedException('Invalid credentials');
        const payload: JwtPayload = {
            id: user.id.toString(),
            email: user.email,
            name: user.nombre,
            role: user.rol,
        };
        var tokens = this.generateTokens(payload);
        this.usuarioService.updateRefreshToken(user.id, tokens.refreshToken);
        return tokens;

    }
    async refresh(refreshToken: string) {
        try {
            const payload = this.jwtService.verify(refreshToken, {
                secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
            });
            if (!payload)
                throw new UnauthorizedException('Invalid refresh token');
            const user = await this.usuarioService.findOne(payload.id);
            // TO DO VAlidar refresh token con BD

            if (!user) throw new UnauthorizedException('Invalid refresh token');
            //TO DO
            /*if (!user.isActive)
                throw new UnauthorizedException('User inactive');*/

            //TO DO

            const userPayload: JwtPayload = {
                id: user.id.toString(),
                email: user.email,
                name: user.nombre,
                role: user.rol,
            };
            var tokens = this.generateTokens(userPayload);
            this.usuarioService.updateRefreshToken(user.id, tokens.refreshToken);
            return tokens;

        } catch (err) {
            throw new UnauthorizedException('Invalid refresh token');
        }
    }

    private generateTokens(data: JwtPayload) {
        const payload = {
            id: data.id,
            email: data.email,
            role: data.role,
            name: data.name,
        };
        const accessToken = this.jwtService.sign<JwtPayload>(payload, {
            expiresIn: this.configService.get('JWT_EXPIRES') || '15m',
            secret: this.configService.get<string>('JWT_SECRET'),
        });

        const refreshToken = this.jwtService.sign<RefreshDto>({ refresh_token: payload.id }, {
            expiresIn: this.configService.get('JWT_REFRESH_EXPIRES') || '7d',
            secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
        });

        return {
            accessToken,
            refreshToken,
        };
    }
}
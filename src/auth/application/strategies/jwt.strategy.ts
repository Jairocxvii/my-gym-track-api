import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService } from "@nestjs/config";
import { JwtPayload } from "../interfaces/jwt-payload.interface";
import { UsuarioService } from "../../../usuario/application/services/usuario.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private configService: ConfigService,
        private usuarioService: UsuarioService) {
        const secret = configService.get<string>('JWT_SECRET');
        if (!secret) {
            throw new Error('JWT_SECRET is missing');
        }
        super({
            secretOrKey: secret,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
    }

    async validate(payload: JwtPayload): Promise<any> {
        const { id } = payload;
        const user = await this.usuarioService.findOne(+id);
        if (!user)
            throw new UnauthorizedException('Token not valid');

        // Si el usuario existe pero está inactivo, también lanza una excepción
        // TO DO
        /*      if (!user.isActive)
                  throw new UnauthorizedException('User is inactive, talk with an admin');
        */
        return user;
    }
}
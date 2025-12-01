// src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Usuario } from '../usuario/usuario.entity';
import { GenericRepository } from '../common/repository/generic-repository';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Usuario)
        private readonly usuarioRepo: Repository<Usuario>,
        private readonly jwtService: JwtService,
    ) { }

    private readonly genericRepo = new GenericRepository(this.usuarioRepo);

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.genericRepo.findOneBy({ email } as any);
        if (user && (await bcrypt.compare(pass, user.password_hash))) {
            const { password_hash, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: any) {
        const payload = { sub: user.usuario_id, email: user.email, rol: user.rol };
        const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

        await this.genericRepo.update(user.usuario_id, {
            refresh_token: refreshToken,
        } as any);

        return {
            access_token: this.jwtService.sign(payload),
            refresh_token: refreshToken,
        };
    }

    async refresh(refreshToken: string) {
        try {
            const payload = this.jwtService.verify(refreshToken);
            const user = await this.genericRepo.findOneBy({
                refresh_token: refreshToken,
            } as any);
            if (!user) throw new UnauthorizedException();

            const newPayload = { sub: user.usuario_id, email: user.email, rol: user.rol };
            const newRefreshToken = this.jwtService.sign(newPayload, { expiresIn: '7d' });

            await this.genericRepo.update(user.usuario_id, {
                refresh_token: newRefreshToken,
            } as any);

            return {
                access_token: this.jwtService.sign(newPayload),
                refresh_token: newRefreshToken,
            };
        } catch {
            throw new UnauthorizedException();
        }
    }
}
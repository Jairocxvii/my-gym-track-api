import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';

@Global()
@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                host: configService.get('DB_HOST'),
                port: configService.get('DB_PORT') || 5432,
                username: configService.get('DB_USER'),
                password: configService.get('DB_PASS'),
                database: configService.get('DB_NAME'),
                // Opción 1: Cargar desde path
                entities: [join(__dirname, '../../**/*.entity{.ts,.js}')],
                // Opción 2: Auto-cargar (recomendada si usas TypeOrmModule.forFeature)
                autoLoadEntities: true,
                synchronize: false,
                logging: configService.get('DB_LOGGING') === 'true',
            }),
            inject: [ConfigService],
        }),
    ],
    exports: [TypeOrmModule],
})
export class DatabaseModule { }
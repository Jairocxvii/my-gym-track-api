import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { HASHER_PORT } from './domain/ports/hasher.port';
import { BcryptHasherAdapter } from './infrastructure/adapters/bcrypt-hasher.adapter';

@Module({
  providers: [
    {
      provide: HASHER_PORT,
      useClass: BcryptHasherAdapter,
    },
  ],
  imports: [DatabaseModule],
  exports: [DatabaseModule, HASHER_PORT],
})
export class CommonModule {}

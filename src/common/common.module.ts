import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { HasherService } from './utils/hasher.service';

@Module({
  providers: [HasherService],
  imports: [DatabaseModule],
  exports: [DatabaseModule, HasherService],
})
export class CommonModule { }

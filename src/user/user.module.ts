import { Module } from '@nestjs/common';
import { UserService } from './aplication/services/user.service';
import { UserController } from './infraestructure/controllers/user.controller';

@Module({
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule { }

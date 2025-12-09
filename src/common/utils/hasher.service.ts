import bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';

const SALT_ROUNDS = 12;
@Injectable()
export class HasherService {
  async hash(plain: string): Promise<string> {
    return bcrypt.hash(plain, SALT_ROUNDS);
  }

  async compare(plain: string, hash: string): Promise<boolean> {
    return bcrypt.compare(plain, hash);
  }
}

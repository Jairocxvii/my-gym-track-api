import { Payload } from '../../application/interfaces/payload.interface';

export abstract class TokenServicesPort {
  abstract generateToken(payload: Payload): string;
  abstract verifyToken(token: string): Payload;
  abstract generateRefreshToken(payload: Payload): string;
  abstract verifyRefreshToken(token: string): Payload;
}

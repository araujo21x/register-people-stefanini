import { JwtService } from '@nestjs/jwt';
import { User } from 'generated/prisma';

export function getAccessToken(user: User): string {
  return new JwtService({
    secret: process.env.JWT_SECRET as string,
  }).sign({ id: user.id, name: user.name, email: user.email }, { expiresIn: process.env.JWT_EXPIRES_IN });
}

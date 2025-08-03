import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { IPayloadAuth } from '../types/IPayloadAuth';
import { User } from 'generated/prisma';
import { DataNotFoundError } from '@shared/filter/error/exceptions/data-not-found.error';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: process.env.JWT_SECRET as string,
    });
  }

  async validate(payload: IPayloadAuth): Promise<User> {
    const user = await this.prisma.user.findFirst({ where: { id: payload.id } });
    if (!user) throw new DataNotFoundError('Usuário');

    return user;
  }
}

/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpStatus, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppError } from '@shared/filter/error/exceptions/app.error';
import { User } from 'generated/prisma';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: any) {
    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    if (err || !user) throw new AppError('Unauthorized', HttpStatus.UNAUTHORIZED);

    return user;
  }
}

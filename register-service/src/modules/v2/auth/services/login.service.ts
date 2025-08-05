import { HttpStatus, Injectable } from '@nestjs/common';
import { LoginDto } from '../dto/request/login.dto';
import { PrismaService } from '@prisma/prisma.service';
import { userSelect } from '@shared/selects/user.selects';
import { DataNotFoundError } from '@shared/filter/error/exceptions/data-not-found.error';
import { AppError } from '@shared/filter/error/exceptions/app.error';
import * as bcrypt from 'bcrypt';
import { getAccessToken } from '../utils/getAccessToken';
import { LoginResponseDto } from '../dto/response/login-response.dto';

@Injectable()
export class LoginService {
  constructor(private readonly prismaService: PrismaService) {}

  public async execute(body: LoginDto): Promise<LoginResponseDto> {
    const user = await this.prismaService.user.findFirst({ where: { email: body.email }, select: userSelect.login });
    if (!user) throw new DataNotFoundError('Usuário');

    const isValidPassword = await this.comparePasswords(body.password, user.password);
    if (!isValidPassword) throw new AppError('Senha inválida', HttpStatus.UNAUTHORIZED);

    return { user, accessToken: getAccessToken(user) };
  }

  private async comparePasswords(enteredPassword: string, storedPassword: string): Promise<boolean> {
    const isMatch = await bcrypt.compare(enteredPassword, storedPassword);
    return isMatch;
  }
}

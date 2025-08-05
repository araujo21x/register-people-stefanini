import { HttpStatus, Injectable } from '@nestjs/common';
import { UserRegisterDto } from '../dto/request/user-register.dto';
import { PrismaService } from '@prisma/prisma.service';
import { AppError } from '@errors/app.error';
import { getAccessToken } from '../utils/getAccessToken';
import { UserRegisterResponseDto } from '../dto/response/user-register-response.dto';
import * as bcrypt from 'bcrypt';
import { Prisma } from 'generated/prisma';

@Injectable()
export class UserRegisterService {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(body: UserRegisterDto): Promise<UserRegisterResponseDto> {
    const userExists = await this.prismaService.user.findFirst({ where: { email: body.email } });
    if (userExists) throw new AppError('Usuário já existe', HttpStatus.BAD_REQUEST);

    const user = await this.prismaService.user.create({ data: this.buildUser(body) });
    return { user, accessToken: getAccessToken(user) };
  }

  private buildUser(body: UserRegisterDto): Prisma.UserCreateInput {
    return {
      name: body.name,
      lastName: body.lastName,
      email: body.email,
      password: bcrypt.hashSync(body.password, 10),
    };
  }
}

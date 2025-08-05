import { HttpStatus, Injectable } from '@nestjs/common';
import { PersonRegisterDto } from '../dto/request/person-register.dto';
import { Prisma, User } from 'generated/prisma';
import { PrismaService } from '@prisma/prisma.service';
import { AppError } from '@shared/filter/error/exceptions/app.error';
import { PersonRegisterResponse } from '../dto/response/person-register-response.dto';

@Injectable()
export class PersonRegisterService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(body: PersonRegisterDto, user: User): Promise<PersonRegisterResponse> {
    await this.validatePerson(body, user);
    const person = await this.prisma.people.create({
      data: this.buildPerson(body, user),
      include: { user: true },
    });

    return person;
  }

  private async validatePerson(body: PersonRegisterDto, user: User): Promise<void> {
    const person = await this.prisma.people.findFirst({
      where: { userId: user.id, cpf: body.cpf, name: body.name, birthday: body.birthday },
    });

    if (person) throw new AppError('Pessoa já cadastrada', HttpStatus.BAD_REQUEST);
  }

  private buildPerson(body: PersonRegisterDto, user: User): Prisma.PeopleCreateInput {
    const personData: Prisma.PeopleCreateInput = {
      name: body.name,
      gender: body.gender,
      email: body.email,
      birthday: body.birthday,
      placeBirth: body.placeBirth,
      nationality: body.nationality,
      cpf: body.cpf,
      user: { connect: { id: user.id } },
    };

    return personData;
  }
}

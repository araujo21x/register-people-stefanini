import { Injectable } from '@nestjs/common';
import { Prisma, User } from 'generated/prisma';
import { PrismaService } from '@prisma/prisma.service';
import { PersonUpdateResponse } from '../dto/response/person-update-response.dto';
import { PersonUpdateDto } from '../dto/request/person-update.dto';
import { DataNotFoundError } from '@shared/filter/error/exceptions/data-not-found.error';

@Injectable()
export class PersonUpdateService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(id: string, body: PersonUpdateDto, user: User): Promise<PersonUpdateResponse> {
    const person = await this.prisma.people.findFirst({ where: { id, userId: user.id } });
    if (!person) throw new DataNotFoundError('Pessoa');

    const personUpdated = await this.prisma.people.update({
      where: { id, userId: user.id },
      data: this.buildPerson(body),
      include: { user: true },
    });

    return personUpdated;
  }

  private buildPerson(body: PersonUpdateDto): Prisma.PeopleUpdateInput {
    const build: Prisma.PeopleUpdateInput = {} as Prisma.PeopleUpdateInput;

    if (body.name) build.name = body.name;
    if (body.cpf) build.cpf = body.cpf;
    if (body.birthday) build.birthday = body.birthday;
    if (body.gender || body.gender === '') build.gender = body.gender;
    if (body.email || body.email === '') build.email = body.email;
    if (body.placeBirth || body.placeBirth === '') build.placeBirth = body.placeBirth;
    if (body.nationality || body.nationality === '') build.nationality = body.nationality;

    return build;
  }
}

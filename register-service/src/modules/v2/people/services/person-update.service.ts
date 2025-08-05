import { HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, User } from 'generated/prisma';
import { PrismaService } from '@prisma/prisma.service';
import { AppError } from '@shared/filter/error/exceptions/app.error';

import { PersonUpdateResponse } from '../dto/response/person-update-response.dto';
import { PersonUpdateDto } from '../dto/request/person-update.dto';
import { DataNotFoundError } from '@shared/filter/error/exceptions/data-not-found.error';
import { AddressDto } from '../dto/request/address.dto';

@Injectable()
export class PersonUpdateService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(id: string, body: PersonUpdateDto, user: User): Promise<PersonUpdateResponse> {
    await this.validatePerson(id, body, user);

    const person = await this.prisma.people.findFirst({ where: { id, userId: user.id } });
    if (!person) throw new DataNotFoundError('Pessoa');

    const personUpdated = await this.prisma.people.update({
      where: { id, userId: user.id },
      data: this.buildPerson(body),
      include: { user: true, address: true },
    });

    return personUpdated;
  }

  private async validatePerson(id: string, body: PersonUpdateDto, user: User): Promise<void> {
    if (!body.cpf && !body.name && !body.birthday) return;

    const where: Prisma.PeopleWhereInput = { id: { not: id }, userId: user.id };

    if (body.cpf) where.cpf = body.cpf;
    if (body.name) where.name = body.name;
    if (body.birthday) where.birthday = body.birthday;

    const person = await this.prisma.people.findFirst({ where });

    if (person) throw new AppError('Pessoa já cadastrada', HttpStatus.BAD_REQUEST);
  }

  private buildPerson(body: PersonUpdateDto): Prisma.PeopleUpdateInput {
    const build: Prisma.PeopleUpdateInput = {} as Prisma.PeopleUpdateInput;

    if (body.name) build.name = body.name;
    if (body.gender) build.gender = body.gender;
    if (body.email) build.email = body.email;
    if (body.birthday) build.birthday = body.birthday;
    if (body.placeBirth) build.placeBirth = body.placeBirth;
    if (body.nationality) build.nationality = body.nationality;
    if (body.cpf) build.cpf = body.cpf;
    if (body.address) build.address = this.buildAddress(body.address);

    return build;
  }

  private buildAddress(address: AddressDto) {
    return {
      upsert: {
        create: {
          street: address.street,
          number: address.number || 'N/A',
          complement: address.complement,
          neighborhood: address.neighborhood,
          city: address.city,
          state: address.state,
          zipCode: address.zipCode,
        },
        update: {
          street: address.street,
          number: address.number || 'N/A',
          complement: address.complement,
          neighborhood: address.neighborhood,
          city: address.city,
          state: address.state,
          zipCode: address.zipCode,
        },
      },
    };
  }
}

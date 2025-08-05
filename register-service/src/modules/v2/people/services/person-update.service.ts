import { HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, User } from 'generated/prisma';
import { PrismaService } from '@prisma/prisma.service';
import { AppError } from '@shared/filter/error/exceptions/app.error';

import { PersonUpdateV2Response } from '../dto/response/person-update-response-v2.dto';
import { PersonUpdateV2Dto } from '../dto/request/person-update-v2.dto';
import { DataNotFoundError } from '@shared/filter/error/exceptions/data-not-found.error';
import { AddressV2Dto } from '../dto/request/address-v2.dto';

@Injectable()
export class PersonUpdateService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(id: string, body: PersonUpdateV2Dto, user: User): Promise<PersonUpdateV2Response> {
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

  private async validatePerson(id: string, body: PersonUpdateV2Dto, user: User): Promise<void> {
    if (!body.cpf && !body.name && !body.birthday) return;

    const where: Prisma.PeopleWhereInput = { id: { not: id }, userId: user.id };

    if (body.cpf) where.cpf = body.cpf;
    if (body.name) where.name = body.name;
    if (body.birthday) where.birthday = body.birthday;

    const person = await this.prisma.people.findFirst({ where });

    if (person) throw new AppError('Pessoa já cadastrada', HttpStatus.BAD_REQUEST);
  }

  private buildPerson(body: PersonUpdateV2Dto): Prisma.PeopleUpdateInput {
    const build: Prisma.PeopleUpdateInput = {} as Prisma.PeopleUpdateInput;

    if (body.name) build.name = body.name;
    if (body.gender || body.gender === '') build.gender = body.gender;
    if (body.email || body.email === '') build.email = body.email;
    if (body.birthday) build.birthday = body.birthday;
    if (body.placeBirth || body.placeBirth === '') build.placeBirth = body.placeBirth;
    if (body.nationality || body.nationality === '') build.nationality = body.nationality;
    if (body.cpf) build.cpf = body.cpf;
    if (body.address) build.address = this.buildAddress(body.address);

    return build;
  }

  private buildAddress(address: AddressV2Dto): Prisma.AddressUpdateOneWithoutPeopleNestedInput {
    const update: Prisma.AddressUpdateInput = {} as Prisma.AddressUpdateInput;

    if (address.street) update.street = address.street;
    if (address.number || address.number === '') update.number = address.number === '' ? 'N/A' : address.number;
    if (address.complement || address.complement === '') update.complement = address.complement;
    if (address.neighborhood) update.neighborhood = address.neighborhood;
    if (address.city) update.city = address.city;
    if (address.state) update.state = address.state;
    if (address.zipCode) update.zipCode = address.zipCode;

    return { update };
  }
}

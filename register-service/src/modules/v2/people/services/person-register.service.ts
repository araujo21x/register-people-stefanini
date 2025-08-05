import { HttpStatus, Injectable } from '@nestjs/common';
import { PersonRegisterV2Dto } from '../dto/request/person-register-v2.dto';
import { Prisma, User } from 'generated/prisma';
import { PrismaService } from '@prisma/prisma.service';
import { AppError } from '@shared/filter/error/exceptions/app.error';
import { PersonRegisterV2Response } from '../dto/response/person-register-response-v2.dto';
import { AddressV2Dto } from '../dto/request/address-v2.dto';

@Injectable()
export class PersonRegisterService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(body: PersonRegisterV2Dto, user: User): Promise<PersonRegisterV2Response> {
    await this.validatePerson(body, user);
    const person = await this.prisma.people.create({
      data: this.buildPerson(body, user),
      include: { user: true, address: true },
    });

    return person;
  }

  private async validatePerson(body: PersonRegisterV2Dto, user: User): Promise<void> {
    const person = await this.prisma.people.findFirst({
      where: { userId: user.id, cpf: body.cpf, name: body.name, birthday: body.birthday },
    });

    if (person) throw new AppError('Pessoa já cadastrada', HttpStatus.BAD_REQUEST);
  }

  private buildPerson(body: PersonRegisterV2Dto, user: User): Prisma.PeopleCreateInput {
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

    personData.address = { create: this.buildAddress(body.address) };

    return personData;
  }

  private buildAddress(address: AddressV2Dto): Prisma.AddressCreateWithoutPeopleInput {
    return {
      street: address.street,
      number: address.number,
      complement: address.complement,
      neighborhood: address.neighborhood,
      city: address.city,
      state: address.state,
      zipCode: address.zipCode,
    };
  }
}

import { Injectable } from '@nestjs/common';
import { Prisma, User } from 'generated/prisma';
import { PrismaService } from '@prisma/prisma.service';
import { PersonShowResponseDto } from '../dto/response/person-show-response.dto';
import { DataNotFoundError } from '@shared/filter/error/exceptions/data-not-found.error';

@Injectable()
export class PersonShowService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(id: string, user: User): Promise<PersonShowResponseDto> {
    const where = this.buildQuery(id, user);

    const person = await this.prisma.people.findFirst({ where, include: { user: true } });
    if (!person) throw new DataNotFoundError('Pessoa');

    return person;
  }

  private buildQuery(id: string, user: User): Prisma.PeopleWhereInput {
    const where: Prisma.PeopleWhereInput = { id, userId: user.id };

    return where;
  }
}

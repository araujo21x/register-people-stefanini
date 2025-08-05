import { Injectable } from '@nestjs/common';
import { Prisma, User } from 'generated/prisma';
import { PrismaService } from '@prisma/prisma.service';
import { DataNotFoundError } from '@shared/filter/error/exceptions/data-not-found.error';

@Injectable()
export class PersonDeleteService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(id: string, user: User): Promise<void> {
    const where = this.buildQuery(id, user);

    const person = await this.prisma.people.findFirst({ where });
    if (!person) throw new DataNotFoundError('Pessoa');

    await this.prisma.people.delete({ where });
  }

  private buildQuery(id: string, user: User): Prisma.PeopleWhereUniqueInput {
    const where: Prisma.PeopleWhereUniqueInput = { id, userId: user.id };

    return where;
  }
}

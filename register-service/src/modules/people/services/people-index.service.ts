import { Injectable } from '@nestjs/common';
import { Prisma, User } from 'generated/prisma';
import { PrismaService } from '@prisma/prisma.service';
import { PeopleIndexDto } from '../dto/request/people-index.dto';
import { PeopleIndexResponseDto } from '../dto/response/people-index-response.dto';
import { handlerPageAndOrder } from '@shared/helpers/handlerPaginationAndOrder';

@Injectable()
export class PeopleIndexService {
  constructor(private readonly prisma: PrismaService) {}

  private readonly KEYS_TO_ORDER: string[] = ['name', 'gender', 'email', 'birthday', 'cpf', 'createdAt', 'updatedAt'];

  async execute(query: PeopleIndexDto, user: User): Promise<PeopleIndexResponseDto> {
    const where = this.buildQuery(query, user);
    const pageAndOrder = handlerPageAndOrder(query, this.KEYS_TO_ORDER);

    const [people, count] = await Promise.all([
      this.prisma.people.findMany({ where, ...pageAndOrder, include: { user: true, address: true } }),
      this.prisma.people.count({ where }),
    ]);

    return { people, count };
  }

  private buildQuery(body: PeopleIndexDto, user: User): Prisma.PeopleWhereInput {
    const where: Prisma.PeopleWhereInput = {};

    if (body.name) where.name = { contains: body.name, mode: 'insensitive' };
    if (body.gender) where.gender = body.gender;
    if (body.email) where.email = { contains: body.email, mode: 'insensitive' };
    if (body.birthday) where.birthday = body.birthday;
    if (body.placeBirth) where.placeBirth = { contains: body.placeBirth, mode: 'insensitive' };
    if (body.nationality) where.nationality = { contains: body.nationality, mode: 'insensitive' };
    if (body.cpf) where.cpf = { contains: body.cpf, mode: 'insensitive' };

    where.userId = user.id;

    return where;
  }
}

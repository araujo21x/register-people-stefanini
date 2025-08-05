import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { HealthResponseV2Dto } from '../dto/response/health-response-v2.dto';

@Injectable()
export class HealthService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(): Promise<HealthResponseV2Dto> {
    try {
      await this.prisma.$queryRaw`SELECT 1`;

      return { status: 'ok' };
    } catch {
      return { status: 'error' };
    }
  }
}

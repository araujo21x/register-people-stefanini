import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { HealthResponseDto } from '../dto/response/health-response.dto';

@Injectable()
export class HealthService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(): Promise<HealthResponseDto> {
    try {
      await this.prisma.$queryRaw`SELECT 1`;

      return { status: 'ok' };
    } catch {
      return { status: 'error' };
    }
  }
}

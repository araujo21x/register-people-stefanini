import { ApiProperty } from '@nestjs/swagger';

export class HealthResponseV2Dto {
  @ApiProperty({
    example: 'ok',
    description: 'Status do serviço de saúde',
    enum: ['ok', 'error'],
  })
  status: string;
} 
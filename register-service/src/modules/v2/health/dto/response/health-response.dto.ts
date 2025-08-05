import { ApiProperty } from '@nestjs/swagger';

export class HealthResponseDto {
  @ApiProperty({
    example: 'ok',
    description: 'Status do serviço de saúde',
    enum: ['ok', 'error'],
  })
  status: string;
}

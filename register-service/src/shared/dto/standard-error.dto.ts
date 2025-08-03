import { ApiProperty } from '@nestjs/swagger';

export class StandardErrorDto {
  @ApiProperty({ example: 400, description: 'Código do status HTTP.' })
  statusCode: number;

  @ApiProperty({ example: 'Bad Request', description: 'Mensagem de erro.' })
  message: string;

  @ApiProperty({ example: '2025-07-21T10:00:00.000Z', description: 'Carimbo de data/hora.' })
  timestamp: string;

  @ApiProperty({ example: 'HTTP_ERROR', description: 'Tipo de erro.' })
  errorType: string;

  @ApiProperty({ example: { originalMessage: 'Bad Request', path: '/users' }, description: 'Detalhes do erro.' })
  details?: { originalMessage?: string; path?: string };
}

import { ApiProperty } from '@nestjs/swagger';

export class AddressResponseDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000', description: 'ID do endereço' })
  id: string;

  @ApiProperty({ example: 'Rua das Flores', description: 'Nome da rua' })
  street: string;

  @ApiProperty({ example: '123', description: 'Número da residência (ou N/A se não informado)' })
  number: string;

  @ApiProperty({ example: 'Apto 101', description: 'Complemento do endereço (opcional)', required: false })
  complement?: string | null;

  @ApiProperty({ example: 'Centro', description: 'Bairro' })
  neighborhood: string;

  @ApiProperty({ example: 'São Paulo', description: 'Cidade' })
  city: string;

  @ApiProperty({ example: 'SP', description: 'Estado (sigla)' })
  state: string;

  @ApiProperty({ example: '01234567', description: 'CEP' })
  zipCode: string;

  @ApiProperty({ example: '2024-06-01T12:00:00.000Z', description: 'Data de criação do registro' })
  createdAt: Date | string;

  @ApiProperty({ example: '2024-06-01T12:00:00.000Z', description: 'Data de atualização do registro' })
  updatedAt: Date | string;
}

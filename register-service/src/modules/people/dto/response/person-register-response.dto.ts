import { ApiProperty } from '@nestjs/swagger';
import { Gender } from 'generated/prisma';
import { UserResponseDto } from '../../../../shared/dto/response/user-response.dto';
import { AddressResponseDto } from '../../../../shared/dto/response/address-response.dto';

export class PersonRegisterResponse {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000', description: 'ID da pessoa' })
  id: string;

  @ApiProperty({ example: 'João Silva', description: 'Nome completo da pessoa' })
  name: string;

  @ApiProperty({ example: 'male', description: 'Sexo da pessoa', enum: Gender, required: false })
  gender?: Gender | null;

  @ApiProperty({ example: 'joao.silva@email.com', description: 'Email da pessoa', required: false })
  email?: string | null;

  @ApiProperty({ example: '1990-05-15', description: 'Data de nascimento no formato YYYY-MM-DD' })
  birthday: Date | string;

  @ApiProperty({ example: 'São Paulo', description: 'Naturalidade da pessoa', required: false })
  placeBirth?: string | null;

  @ApiProperty({ example: 'Brasileira', description: 'Nacionalidade da pessoa', required: false })
  nationality?: string | null;

  @ApiProperty({ example: '12345678901', description: 'CPF da pessoa (apenas números)' })
  cpf: string;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000', description: 'ID do usuário associado' })
  userId: string;

  @ApiProperty({ type: UserResponseDto, description: 'Objeto do usuário registrado' })
  user: UserResponseDto;

  @ApiProperty({ example: '2024-06-01T12:00:00.000Z', description: 'Data de criação do registro' })
  createdAt: Date | string;

  @ApiProperty({ example: '2024-06-01T12:00:00.000Z', description: 'Data de atualização do registro' })
  updatedAt: Date | string;

  @ApiProperty({ type: AddressResponseDto, description: 'Endereço da pessoa', required: false })
  Address?: AddressResponseDto | null;
}

export class PersonRegisterResponseDto {
  @ApiProperty({ type: PersonRegisterResponse })
  person: PersonRegisterResponse;

  @ApiProperty({ example: 'Pessoa criada com sucesso.', description: 'Mensagem de sucesso' })
  message: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MinLength, IsDateString, IsEnum, MaxLength } from 'class-validator';
import { IsCPF } from '@shared/validators/IsCPF.decorator';
import { Gender } from 'generated/prisma';
import { AddressV2Dto } from './address-v2.dto';
import { IsEmailOrEmpty } from '@shared/validators/IsEmailOrEmpty.decorator';

export class PersonRegisterV2Dto {
  @ApiProperty({ example: 'João Silva', description: 'Nome completo da pessoa', minLength: 3 })
  @IsString({ message: 'Nome inválido' })
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  @MinLength(3, { message: 'Nome deve ter no mínimo 3 caracteres' })
  name: string;

  @ApiProperty({ example: 'male', description: 'Sexo da pessoa', enum: Gender, required: false })
  @IsOptional()
  @IsEnum(Gender, { message: 'Sexo deve ser "male" ou "female"' })
  gender?: Gender;

  @ApiProperty({ example: 'joao.silva@email.com', description: 'Email da pessoa', required: false })
  @IsOptional()
  @IsEmailOrEmpty()
  email?: string;

  @ApiProperty({ example: '1990-05-15', description: 'Data de nascimento no formato YYYY-MM-DD' })
  @IsDateString({}, { message: 'Data de nascimento deve ser uma data válida no formato YYYY-MM-DD' })
  @IsNotEmpty({ message: 'Data de nascimento é obrigatória' })
  birthday: string;

  @ApiProperty({ example: 'São Paulo', description: 'Naturalidade da pessoa', required: false })
  @IsOptional()
  @IsString({ message: 'Naturalidade inválida' })
  @MaxLength(100, { message: 'Naturalidade deve ter no máximo 100 caracteres' })
  placeBirth?: string;

  @ApiProperty({ example: 'Brasileira', description: 'Nacionalidade da pessoa', required: false })
  @IsOptional()
  @IsString({ message: 'Nacionalidade inválida' })
  @MaxLength(100, { message: 'Nacionalidade deve ter no máximo 100 caracteres' })
  nationality?: string;

  @ApiProperty({ example: '12345678901', description: 'CPF da pessoa (apenas números)', minLength: 11, maxLength: 11 })
  @IsString({ message: 'CPF inválido' })
  @IsNotEmpty({ message: 'CPF é obrigatório' })
  @IsCPF({ message: 'CPF deve ter formato válido' })
  cpf: string;

  @ApiProperty({ type: AddressV2Dto, description: 'Endereço da pessoa', required: false })
  @IsNotEmpty({ message: 'Endereço é obrigatório' })
  address: AddressV2Dto;
}

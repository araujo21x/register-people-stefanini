import { ApiPropertyOptional } from '@nestjs/swagger';
import { BasicIndexDto } from '@shared/dto/request/basic-index.dto';
import { IsOptional, IsString, IsEnum, IsDateString, MaxLength, MinLength } from 'class-validator';
import { Gender } from 'generated/prisma';

export class PeopleIndexDto extends BasicIndexDto {
  @ApiPropertyOptional({ example: 'João', description: 'Filtrar por nome (parcial ou completo)' })
  @IsOptional()
  @IsString({ message: 'Nome deve ser uma string' })
  @MaxLength(225, { message: 'Nome deve ter no máximo 225 caracteres' })
  name?: string;

  @ApiPropertyOptional({ example: 'male', description: 'Filtrar por sexo', enum: Gender })
  @IsOptional()
  @IsEnum(Gender, { message: 'Sexo deve ser "male" ou "female"' })
  gender?: Gender;

  @ApiPropertyOptional({ example: 'joao@email.com', description: 'Filtrar por email (parcial ou completo)' })
  @IsOptional()
  @IsString({ message: 'Email deve ser uma string' })
  @MaxLength(225, { message: 'Email deve ter no máximo 225 caracteres' })
  email?: string;

  @ApiPropertyOptional({ example: '1990-05-15', description: 'Filtrar por data de nascimento (YYYY-MM-DD)' })
  @IsOptional()
  @IsDateString({}, { message: 'Data de nascimento deve ser uma data válida no formato YYYY-MM-DD' })
  birthday?: string;

  @ApiPropertyOptional({ example: 'São Paulo', description: 'Filtrar por naturalidade (parcial ou completa)' })
  @IsOptional()
  @IsString({ message: 'Naturalidade deve ser uma string' })
  @MaxLength(100, { message: 'Naturalidade deve ter no máximo 100 caracteres' })
  placeBirth?: string;

  @ApiPropertyOptional({ example: 'Brasileira', description: 'Filtrar por nacionalidade (parcial ou completa)' })
  @IsOptional()
  @IsString({ message: 'Nacionalidade deve ser uma string' })
  @MaxLength(100, { message: 'Nacionalidade deve ter no máximo 100 caracteres' })
  nationality?: string;

  @ApiPropertyOptional({ example: '12345678901', description: 'Filtrar por CPF (parcial ou completo, apenas números)' })
  @IsOptional()
  @IsString({ message: 'CPF deve ser uma string' })
  @MinLength(1, { message: 'CPF deve ter pelo menos 1 caractere' })
  @MaxLength(11, { message: 'CPF deve ter no máximo 11 caracteres' })
  cpf?: string;
}

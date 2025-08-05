import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength, IsDateString, IsEnum, MaxLength } from 'class-validator';
import { IsCPF } from '@shared/validators/IsCPF.decorator';
import { Gender } from 'generated/prisma';
import { Transform } from 'class-transformer';

export class PersonRegisterDto {
  @ApiProperty({ example: 'João Silva', description: 'Nome completo da pessoa', minLength: 3 })
  @IsString({ message: 'Nome inválido' })
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  @MinLength(3, { message: 'Nome deve ter no mínimo 3 caracteres' })
  name: string;

  @ApiProperty({ example: 'male', description: 'Sexo da pessoa', enum: Gender, required: false })
  @IsOptional()
  @IsEnum(Gender, { message: 'Sexo deve ser "male" ou "female"' })
  @Transform(({ value }: { value?: string }) => (value === '' ? undefined : value))
  gender?: Gender;

  @ApiProperty({ example: 'joao.silva@email.com', description: 'Email da pessoa', required: false })
  @IsOptional()
  @IsEmail({}, { message: 'Email inválido' })
  @Transform(({ value }: { value?: string }) => (value === '' ? undefined : value))
  email?: string;

  @ApiProperty({ example: '1990-05-15', description: 'Data de nascimento no formato YYYY-MM-DD' })
  @IsDateString({}, { message: 'Data de nascimento deve ser uma data válida no formato YYYY-MM-DD' })
  @IsNotEmpty({ message: 'Data de nascimento é obrigatória' })
  birthday: string;

  @ApiProperty({ example: 'São Paulo', description: 'Naturalidade da pessoa', required: false })
  @IsOptional()
  @IsString({ message: 'Naturalidade inválida' })
  @MaxLength(100, { message: 'Naturalidade deve ter no máximo 100 caracteres' })
  @Transform(({ value }: { value?: string }) => (value === '' ? undefined : value))
  placeBirth?: string;

  @ApiProperty({ example: 'Brasileira', description: 'Nacionalidade da pessoa', required: false })
  @IsOptional()
  @IsString({ message: 'Nacionalidade inválida' })
  @MaxLength(100, { message: 'Nacionalidade deve ter no máximo 100 caracteres' })
  @Transform(({ value }: { value?: string }) => (value === '' ? undefined : value))
  nationality?: string;

  @ApiProperty({ example: '12345678901', description: 'CPF da pessoa (apenas números)', minLength: 11, maxLength: 11 })
  @IsString({ message: 'CPF inválido' })
  @IsNotEmpty({ message: 'CPF é obrigatório' })
  @IsCPF({ message: 'CPF deve ter formato válido' })
  cpf: string;
}

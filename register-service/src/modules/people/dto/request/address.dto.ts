import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, MaxLength, MinLength, Matches } from 'class-validator';

export class AddressDto {
  @ApiProperty({ example: 'Rua das Flores', description: 'Nome da rua', maxLength: 225 })
  @IsString({ message: 'Rua inválida' })
  @IsNotEmpty({ message: 'Rua é obrigatória' })
  @MaxLength(225, { message: 'Rua deve ter no máximo 225 caracteres' })
  street: string;

  @ApiProperty({ example: '123', description: 'Número da residência (opcional)', maxLength: 10, required: false })
  @IsOptional()
  @IsString({ message: 'Número inválido' })
  @MaxLength(10, { message: 'Número deve ter no máximo 10 caracteres' })
  number?: string;

  @ApiProperty({
    example: 'Apto 101',
    description: 'Complemento do endereço (opcional)',
    maxLength: 225,
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Complemento inválido' })
  @MaxLength(225, { message: 'Complemento deve ter no máximo 225 caracteres' })
  complement?: string;

  @ApiProperty({ example: 'Centro', description: 'Bairro', maxLength: 225 })
  @IsString({ message: 'Bairro inválido' })
  @IsNotEmpty({ message: 'Bairro é obrigatório' })
  @MaxLength(225, { message: 'Bairro deve ter no máximo 225 caracteres' })
  neighborhood: string;

  @ApiProperty({ example: 'São Paulo', description: 'Cidade', maxLength: 225 })
  @IsString({ message: 'Cidade inválida' })
  @IsNotEmpty({ message: 'Cidade é obrigatória' })
  @MaxLength(225, { message: 'Cidade deve ter no máximo 225 caracteres' })
  city: string;

  @ApiProperty({ example: 'SP', description: 'Estado (sigla)', maxLength: 2, minLength: 2 })
  @IsString({ message: 'Estado inválido' })
  @IsNotEmpty({ message: 'Estado é obrigatório' })
  @MinLength(2, { message: 'Estado deve ter 2 caracteres' })
  @MaxLength(2, { message: 'Estado deve ter 2 caracteres' })
  @Matches(/^[A-Z]{2}$/, { message: 'Estado deve ser uma sigla válida com 2 letras maiúsculas' })
  state: string;

  @ApiProperty({ example: '01234567', description: 'CEP (apenas números)', maxLength: 8, minLength: 8 })
  @IsString({ message: 'CEP inválido' })
  @IsNotEmpty({ message: 'CEP é obrigatório' })
  @MinLength(8, { message: 'CEP deve ter 8 dígitos' })
  @MaxLength(8, { message: 'CEP deve ter 8 dígitos' })
  @Matches(/^\d{8}$/, { message: 'CEP deve conter apenas 8 dígitos numéricos' })
  zipCode: string;
}

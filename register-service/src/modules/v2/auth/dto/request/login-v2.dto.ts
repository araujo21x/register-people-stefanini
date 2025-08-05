import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginV2Dto {
  @ApiProperty({
    example: 'usuario@email.com',
    description: 'Email do usuário',
    minLength: 5,
  })
  @IsEmail({}, { message: 'Email inválido' })
  @IsNotEmpty({ message: 'Email é obrigatório' })
  @MinLength(5, { message: 'Email deve ter no mínimo 5 caracteres' })
  email: string;

  @ApiProperty({
    example: 'senhaSegura123',
    description: 'Senha do usuário',
    minLength: 8,
  })
  @IsString({ message: 'Senha inválida' })
  @IsNotEmpty({ message: 'Senha é obrigatória' })
  @MinLength(8, { message: 'Senha deve ter no mínimo 8 caracteres' })
  password: string;
} 
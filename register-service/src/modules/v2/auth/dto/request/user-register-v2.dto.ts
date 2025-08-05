import { Match } from '@shared/validators/IsMath.decorator';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserRegisterV2Dto {
  @ApiProperty({ example: 'João', description: 'Nome do usuário', minLength: 3 })
  @IsString({ message: 'Nome inválido' })
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  @MinLength(3, { message: 'Nome deve ter no mínimo 3 caracteres' })
  name: string;

  @ApiProperty({ example: 'Silva', description: 'Sobrenome do usuário', minLength: 3 })
  @IsString({ message: 'Sobrenome inválido' })
  @IsNotEmpty({ message: 'Sobrenome é obrigatório' })
  @MinLength(3, { message: 'Sobrenome deve ter no mínimo 3 caracteres' })
  lastName: string;

  @ApiProperty({ example: 'joao@email.com', description: 'Email do usuário', minLength: 5 })
  @IsEmail({}, { message: 'Email inválido' })
  @IsNotEmpty({ message: 'Email é obrigatório' })
  @MinLength(5, { message: 'Email deve ter no mínimo 5 caracteres' })
  email: string;

  @ApiProperty({ example: 'senhaSegura123', description: 'Senha do usuário', minLength: 8 })
  @IsString({ message: 'Senha inválida' })
  @IsNotEmpty({ message: 'Senha é obrigatória' })
  @MinLength(8, { message: 'Senha deve ter no mínimo 8 caracteres' })
  password: string;

  @ApiProperty({ example: 'senhaSegura123', description: 'Confirmação da senha do usuário', minLength: 8 })
  @IsString({ message: 'Senha inválida' })
  @IsNotEmpty({ message: 'Senha é obrigatória' })
  @MinLength(8, { message: 'Senha deve ter no mínimo 8 caracteres' })
  @Match('password', { message: 'As senhas não coincidem' })
  confirmPassword?: string;
} 
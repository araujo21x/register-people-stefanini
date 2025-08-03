import { ApiProperty } from '@nestjs/swagger';
import { User } from 'generated/prisma';

export class UserResponseDto implements Omit<User, 'password'> {
  @ApiProperty({ example: '1', description: 'ID do usuário registrado' })
  id: string;

  @ApiProperty({ example: 'joao@email.com', description: 'Email do usuário registrado' })
  email: string;

  @ApiProperty({ example: 'João', description: 'Nome do usuário registrado' })
  name: string;

  @ApiProperty({ example: 'Silva', description: 'Sobrenome do usuário registrado' })
  lastName: string;

  @ApiProperty({ example: '2024-06-01T12:00:00.000Z', description: 'Data de criação do usuário' })
  createdAt: Date;

  @ApiProperty({ example: '2024-06-01T12:00:00.000Z', description: 'Data de atualização do usuário' })
  updatedAt: Date;

  constructor(user: User) {
    Object.assign(this, user);
  }
}

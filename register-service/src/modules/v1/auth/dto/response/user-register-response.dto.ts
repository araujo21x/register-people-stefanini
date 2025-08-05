import { ApiProperty } from '@nestjs/swagger';
import { UserResponseDto } from '@shared/dto/response/user-response.dto';

export class UserRegisterResponseDto {
  @ApiProperty({ type: UserResponseDto, description: 'Objeto do usuário registrado' })
  user: UserResponseDto;

  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5', description: 'Token de acesso JWT gerado para o usuário' })
  accessToken: string;
}

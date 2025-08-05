import { Controller, Post, Body, UseGuards, Get, Version } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { LoginService } from '../services/login.service';
import { UserRegisterService } from '../services/user-register.service';
import { UserRegisterV2Dto } from '../dto/request/user-register-v2.dto';
import { LoginV2Dto } from '../dto/request/login-v2.dto';
import { StandardApiResponses } from '@shared/decorators/api-responses.decorator';
import { UserRegisterResponseV2Dto } from '../dto/response/user-register-response-v2.dto';
import { LoginResponseV2Dto } from '../dto/response/login-response-v2.dto';
import { UserResponseDto } from '@shared/dto/response/user-response.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { GetPayload } from '@shared/decorators/get-payload.decorator';
import { User } from 'generated/prisma';

@ApiTags('AutenticaçãoV2')
@Controller({ path: 'auth', version: '2' })
export class AuthController {
  constructor(
    private readonly userRegisterService: UserRegisterService,
    private readonly loginService: LoginService,
  ) {}

  @Post('register-user')
  @Version('2')
  @ApiOperation({ summary: 'Registrar novo usuário' })
  @ApiResponse({ status: 201, description: 'Usuário registrado com sucesso.', type: UserRegisterResponseV2Dto })
  @StandardApiResponses()
  async registerUser(@Body() body: UserRegisterV2Dto): Promise<UserRegisterResponseV2Dto> {
    return await this.userRegisterService.execute(body);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login do usuário' })
  @ApiResponse({ status: 201, description: 'Login realizado com sucesso.', type: LoginResponseV2Dto })
  @StandardApiResponses()
  async login(@Body() body: LoginV2Dto): Promise<LoginResponseV2Dto> {
    return await this.loginService.execute(body);
  }

  @Get('profile')
  @ApiOperation({ summary: 'Perfil do usuário' })
  @ApiResponse({ status: 201, description: 'Perfil do usuário.', type: UserResponseDto })
  @ApiBearerAuth()
  @StandardApiResponses()
  @UseGuards(JwtAuthGuard)
  getProfile(@GetPayload() user: User): UserResponseDto {
    return user;
  }
}

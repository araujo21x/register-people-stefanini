import { Controller, Post, Body, UseGuards, Get, Version } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LoginService } from '../services/login.service';
import { UserRegisterService } from '../services/user-register.service';
import { UserRegisterDto } from '../dto/request/user-register.dto';
import { LoginDto } from '../dto/request/login.dto';
import { StandardApiResponses } from '@shared/decorators/api-responses.decorator';
import { UserRegisterResponseDto } from '../dto/response/user-register-response.dto';
import { LoginResponseDto } from '../dto/response/login-response.dto';
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
  @ApiResponse({ status: 201, description: 'Usuário registrado com sucesso.', type: UserRegisterResponseDto })
  @StandardApiResponses()
  async registerUser(@Body() body: UserRegisterDto): Promise<UserRegisterResponseDto> {
    return await this.userRegisterService.execute(body);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login do usuário' })
  @ApiResponse({ status: 201, description: 'Login realizado com sucesso.', type: LoginResponseDto })
  @StandardApiResponses()
  async login(@Body() body: LoginDto): Promise<LoginResponseDto> {
    return await this.loginService.execute(body);
  }

  @Get('profile')
  @ApiOperation({ summary: 'Perfil do usuário' })
  @ApiResponse({ status: 201, description: 'Perfil do usuário.', type: UserResponseDto })
  @StandardApiResponses()
  @UseGuards(JwtAuthGuard)
  getProfile(@GetPayload() user: User): UserResponseDto {
    return user;
  }
}

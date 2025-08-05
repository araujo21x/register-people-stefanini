import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { PrismaModule } from '@prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { UserRegisterService } from './services/user-register.service';
import { LoginService } from './services/login.service';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  controllers: [AuthController],
  imports: [
    PassportModule,
    JwtModule.register({ secret: process.env.JWT_SECRET as string, signOptions: { expiresIn: '7d' } }),
    PrismaModule,
  ],
  providers: [JwtAuthGuard, JwtStrategy, LoginService, UserRegisterService],
  exports: [JwtAuthGuard],
})
export class AuthModule {}

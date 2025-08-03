import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from '@prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { ErrorExceptionFilter } from '@shared/filter/error/error-exception.filter';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { CustomValidationPipe } from '@shared/pipes/CustomValidation.pipe';
import { ErrorModule } from '@shared/filter/error/error.module';

@Module({
  imports: [ErrorModule, PrismaModule, AuthModule],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_FILTER, useClass: ErrorExceptionFilter },
    { provide: APP_PIPE, useClass: CustomValidationPipe },
  ],
})
export class AppModule {}

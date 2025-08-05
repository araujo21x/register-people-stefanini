import { Module } from '@nestjs/common';
import { PrismaModule } from '@prisma/prisma.module';
import { ErrorExceptionFilter } from '@shared/filter/error/error-exception.filter';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { CustomValidationPipe } from '@shared/pipes/CustomValidation.pipe';
import { ErrorModule } from '@shared/filter/error/error.module';
import { V1Module } from '@module/v1/v1.module';
import { V2Module } from '@module/v2/v2.module';

@Module({
  imports: [ErrorModule, PrismaModule, V1Module, V2Module],
  providers: [
    { provide: APP_FILTER, useClass: ErrorExceptionFilter },
    { provide: APP_PIPE, useClass: CustomValidationPipe },
  ],
})
export class AppModule {}

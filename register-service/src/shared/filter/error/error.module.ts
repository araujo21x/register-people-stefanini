import { Module } from '@nestjs/common';
import { ErrorHandlerContext } from './context/error-handler.context';
import { DefaultErrorStrategy } from './strategies/default-error.strategy';
import { HttpErrorStrategy } from './strategies/http-error.strategy';

@Module({
  providers: [ErrorHandlerContext, DefaultErrorStrategy, HttpErrorStrategy],
  exports: [ErrorHandlerContext, DefaultErrorStrategy, HttpErrorStrategy],
})
export class ErrorModule {}

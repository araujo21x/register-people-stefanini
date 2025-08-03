import { Catch, ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import { ErrorHandlerContext } from './context/error-handler.context';
import { StandardErrorResponse } from './strategies/error-handling.strategy';

@Catch()
export class ErrorExceptionFilter implements ExceptionFilter {
  constructor(private readonly errorHandlerContext: ErrorHandlerContext) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const errorToHandle = exception instanceof Error ? exception : new Error(String(exception));
    const errorResponse: StandardErrorResponse = this.errorHandlerContext.handleError(errorToHandle, host);

    response.status(errorResponse.statusCode).json(errorResponse);
  }
}

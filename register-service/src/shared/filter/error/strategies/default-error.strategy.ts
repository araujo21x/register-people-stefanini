import { ArgumentsHost, HttpStatus, Injectable } from '@nestjs/common';
import { ErrorHandlingStrategy, StandardErrorResponse } from './error-handling.strategy';

@Injectable()
export class DefaultErrorStrategy extends ErrorHandlingStrategy {
  supports(): boolean {
    return true;
  }

  handleError(error: Error, host: ArgumentsHost): StandardErrorResponse {
    let path: string | undefined;
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    if (request && request.url) path = request.url;

    return this.buildError('Ocorreu um erro interno inesperado.', HttpStatus.INTERNAL_SERVER_ERROR, path, error);
  }

  buildError(message: string, status: number = 500, path?: string, error?: Error): StandardErrorResponse {
    return {
      statusCode: status,
      message: message,
      errorType: 'UNKNOWN_ERROR',
      timestamp: new Date().toISOString(),
      details: {
        path,
        originalName: error?.name,
        originalMessage: error?.message,
      },
    };
  }

  defaultError(message?: string, path?: string): StandardErrorResponse {
    return this.buildError(message || 'Ocorreu um erro interno inesperado.', HttpStatus.INTERNAL_SERVER_ERROR, path);
  }
}

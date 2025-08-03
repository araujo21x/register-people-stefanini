import { Injectable, Logger } from '@nestjs/common';
import { ArgumentsHost } from '@nestjs/common';
import { ErrorHandlingStrategy, StandardErrorResponse } from '../strategies/error-handling.strategy';
import { DefaultErrorStrategy } from '../strategies/default-error.strategy';
import { HttpErrorStrategy } from '../strategies/http-error.strategy';

@Injectable()
export class ErrorHandlerContext {
  private readonly strategies: ErrorHandlingStrategy[];
  private readonly defaultStrategy: DefaultErrorStrategy;
  private readonly logger = new Logger(ErrorHandlerContext.name);

  constructor(
    private readonly httpErrorStrategy: HttpErrorStrategy,
    private readonly defaultErrorStrategyInstance: DefaultErrorStrategy,
  ) {
    this.strategies = [this.httpErrorStrategy];
    this.defaultStrategy = this.defaultErrorStrategyInstance;
  }

  handleError(error: Error, host: ArgumentsHost): StandardErrorResponse {
    for (const strategy of this.strategies) {
      if (strategy.supports(error)) {
        return strategy.handleError(error, host);
      }
    }

    this.logger.error(
      `[ERROR_HANDLER_CONTEXT] Nenhuma estratégia encontrada para o erro: ${error.name} - ${error.message}`,
    );

    return this.defaultStrategy.handleError(error, host);
  }
}

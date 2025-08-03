import { AppError } from '@shared/filter/error/exceptions/app.error';
import { ValidationPipe, ValidationError, HttpStatus } from '@nestjs/common';

export class CustomValidationPipe extends ValidationPipe {
  constructor() {
    super({
      whitelist: true,
      transform: true,
      exceptionFactory: (errors: ValidationError[]) => {
        const response = this.handleValidationErrors(errors);
        return new AppError(response, HttpStatus.BAD_REQUEST);
      },
    });
  }

  handleValidationErrors(errors: ValidationError[]): string {
    let response: string = '';

    errors.forEach((error) => {
      const msgs = Object.values(error.constraints ?? {});

      response += `${error.property}:\n* ${msgs.join('\n* ')}\n`;
    });

    return response;
  }
}

import { HttpStatus } from '@nestjs/common';
import { AppError } from './app.error';

export class DataNotFoundError extends AppError {
  constructor(data: string, statusCode: number = HttpStatus.NOT_FOUND) {
    super(`${data} não encontrado(s)`, statusCode);
  }
}

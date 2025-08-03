import { applyDecorators } from '@nestjs/common';
import { ApiBadRequestResponse, ApiNotFoundResponse, ApiInternalServerErrorResponse } from '@nestjs/swagger';
import { StandardErrorDto } from '@shared/dto/standard-error.dto';

export function StandardApiResponses() {
  return applyDecorators(
    ApiBadRequestResponse({
      description: 'Dados inválidos ou requisição mal formatada.',
      type: StandardErrorDto,
    }),
    ApiNotFoundResponse({
      description: 'O recurso solicitado não foi encontrado.',
      type: StandardErrorDto,
    }),
    ApiInternalServerErrorResponse({
      description: 'Erro interno do servidor.',
      type: StandardErrorDto,
    }),
  );
}

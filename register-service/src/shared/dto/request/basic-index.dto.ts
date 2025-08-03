import { Transform } from 'class-transformer';
import { IsIn, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class BasicIndexDto {
  @ApiPropertyOptional({
    example: 1,
    description: 'Número da página para paginação (começa em 1)',
    minimum: 1,
    type: Number,
    default: 1,
  })
  @IsOptional()
  @IsInt({ message: 'pagina deve ser um número inteiro' })
  @Min(1, { message: 'pagina deve ser no mínimo 1' })
  @Transform(({ value }) => Number(value))
  page?: number;

  @ApiPropertyOptional({
    example: 10,
    description: 'Quantidade de itens por página (mínimo 1)',
    minimum: 1,
    type: Number,
    default: 10,
  })
  @IsOptional()
  @IsInt({ message: 'limite deve ser um número inteiro' })
  @Min(1, { message: 'limite deve ser no mínimo 1' })
  @Max(1000, { message: 'limite deve ser no máximo 1000' })
  @Transform(({ value }) => Number(value))
  limit?: number;

  @ApiPropertyOptional({
    example: 'desc',
    description: 'Ordem de ordenação dos resultados ("desc" para decrescente, "asc" para crescente)',
    enum: ['desc', 'asc'],
    default: 'desc',
  })
  @IsOptional()
  @Transform(({ value }): string => value)
  @IsIn(['desc', 'asc'], { message: 'ordem deve ser "desc" ou "asc"' })
  order?: 'desc' | 'asc';

  @ApiPropertyOptional({
    example: 'createdAt',
    description: 'Campo pelo qual os resultados serão ordenados',
    type: String,
    default: 'createdAt',
  })
  @IsOptional()
  @IsString({ message: 'orderKey deve ser uma string' })
  @Transform(({ value }): string => value)
  orderKey?: string;
}

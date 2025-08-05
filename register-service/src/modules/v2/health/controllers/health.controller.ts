import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Controller, Get } from '@nestjs/common';
import { HealthService } from '../services/health.service';
import { HealthResponseDto } from '../dto/response/health-response.dto';
import { StandardApiResponses } from '@shared/decorators/api-responses.decorator';

@ApiTags('HealthV2')
@Controller({ path: 'health', version: '2' })
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  @ApiOperation({ summary: 'Verificar status de saúde do serviço' })
  @ApiResponse({
    status: 200,
    description: 'Status do serviço de saúde retornado com sucesso.',
    type: HealthResponseDto,
  })
  @StandardApiResponses()
  async health(): Promise<HealthResponseDto> {
    return await this.healthService.execute();
  }
}

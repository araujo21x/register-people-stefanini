import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Controller, Get } from '@nestjs/common';
import { HealthService } from '../services/health.service';
import { HealthResponseV2Dto } from '../dto/response/health-response-v2.dto';
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
    type: HealthResponseV2Dto,
  })
  @StandardApiResponses()
  async health(): Promise<HealthResponseV2Dto> {
    return await this.healthService.execute();
  }
}

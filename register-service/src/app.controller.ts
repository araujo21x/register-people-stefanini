import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('health')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Endpoint de saúde' })
  @ApiResponse({ status: 200, description: 'Retorna uma mensagem de saúde' })
  getHello(): string {
    return this.appService.getHello();
  }
}

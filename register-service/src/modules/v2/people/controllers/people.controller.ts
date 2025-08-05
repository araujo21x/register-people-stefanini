import { Controller, Post, Body, UseGuards, Get, Query, Param, Delete, Patch } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '@module/v2/auth/guards/jwt-auth.guard';
import { StandardApiResponses } from '@shared/decorators/api-responses.decorator';
import { PersonRegisterV2Dto } from '../dto/request/person-register-v2.dto';
import { PersonRegisterService } from '../services/person-register.service';
import { GetPayload } from '@shared/decorators/get-payload.decorator';
import { User } from 'generated/prisma';
import { PeopleIndexV2Dto } from '../dto/request/people-index-v2.dto';
import { PeopleIndexService } from '../services/people-index.service';
import { PersonRegisterResponseV2Dto } from '../dto/response/person-register-response-v2.dto';
import { PeopleIndexV2ResponseDto } from '../dto/response/people-index-response-v2.dto';
import { PersonShowResponseV2Dto } from '../dto/response/person-show-response-v2.dto';
import { PersonShowService } from '../services/person-show.service';
import { PersonDeleteService } from '../services/person-delete.service';
import { PersonUpdateV2Dto } from '../dto/request/person-update-v2.dto';
import { PersonUpdateResponseV2Dto } from '../dto/response/person-update-response-v2.dto';
import { PersonUpdateService } from '../services/person-update.service';

@ApiTags('PessoasV2')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller({ path: 'people', version: '2' })
export class PeopleController {
  constructor(
    private readonly peopleRegisterService: PersonRegisterService,
    private readonly peopleIndexService: PeopleIndexService,
    private readonly personShowService: PersonShowService,
    private readonly personDeleteService: PersonDeleteService,
    private readonly personUpdateService: PersonUpdateService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Criar uma nova pessoa' })
  @ApiResponse({ status: 201, description: 'Pessoa criada com sucesso.', type: PersonRegisterResponseV2Dto })
  @StandardApiResponses()
  async register(@GetPayload() user: User, @Body() body: PersonRegisterV2Dto): Promise<PersonRegisterResponseV2Dto> {
    const person = await this.peopleRegisterService.execute(body, user);

    return { message: 'Pessoa criada com sucesso.', person };
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas as pessoas' })
  @ApiResponse({ status: 200, description: 'Pessoas listadas com sucesso.', type: PeopleIndexV2ResponseDto })
  @StandardApiResponses()
  async index(@GetPayload() user: User, @Query() query: PeopleIndexV2Dto): Promise<PeopleIndexV2ResponseDto> {
    return await this.peopleIndexService.execute(query, user);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar uma pessoa pelo ID' })
  @ApiResponse({ status: 200, description: 'Pessoa encontrada com sucesso.', type: PersonShowResponseV2Dto })
  @StandardApiResponses()
  async show(@GetPayload() user: User, @Param('id') id: string): Promise<PersonShowResponseV2Dto> {
    return await this.personShowService.execute(id, user);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar dados de uma pessoa' })
  @ApiResponse({ status: 200, description: 'Pessoa atualizada com sucesso.', type: PersonUpdateResponseV2Dto })
  @StandardApiResponses()
  async update(
    @GetPayload() user: User,
    @Param('id') id: string,
    @Body() body: PersonUpdateV2Dto,
  ): Promise<PersonUpdateResponseV2Dto> {
    const person = await this.personUpdateService.execute(id, body, user);

    return { message: 'Pessoa atualizada com sucesso.', person };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover uma pessoa' })
  @ApiResponse({
    status: 200,
    description: 'Pessoa removida com sucesso.',
    schema: { example: { message: 'Pessoa removida com sucesso.' } },
  })
  @StandardApiResponses()
  async remove(@GetPayload() user: User, @Param('id') id: string): Promise<{ message: string }> {
    await this.personDeleteService.execute(id, user);

    return { message: 'Pessoa removida com sucesso.' };
  }
}

import { PartialType } from '@nestjs/swagger';
import { PersonRegisterV2Dto } from './person-register-v2.dto';

export class PersonUpdateV2Dto extends PartialType(PersonRegisterV2Dto) {} 
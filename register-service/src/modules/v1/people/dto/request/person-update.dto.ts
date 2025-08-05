import { PartialType } from '@nestjs/swagger';
import { PersonRegisterDto } from './person-register.dto';

export class PersonUpdateDto extends PartialType(PersonRegisterDto) {}

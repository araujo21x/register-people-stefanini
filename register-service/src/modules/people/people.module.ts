import { Module } from '@nestjs/common';
import { PeopleController } from './controllers/people.controller';
import { PrismaModule } from '@prisma/prisma.module';
import { PersonRegisterService } from './services/person-register.service';
import { AuthModule } from '@module/auth/auth.module';
import { PersonShowService } from './services/person-show.service';
import { PersonDeleteService } from './services/person-delete.service';
import { PeopleIndexService } from './services/people-index.service';
import { PersonUpdateService } from './services/person-update.service';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [PeopleController],
  providers: [PersonRegisterService, PeopleIndexService, PersonShowService, PersonDeleteService, PersonUpdateService],
})
export class PeopleModule {}

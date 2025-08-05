import { Module } from '@nestjs/common';
import { PeopleModule } from './people/people.module';
import { AuthModule } from './auth/auth.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [HealthModule, AuthModule, PeopleModule],
})
export class V1Module {}

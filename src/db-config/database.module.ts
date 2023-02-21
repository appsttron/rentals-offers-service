import { Module } from '@nestjs/common';
import { dbConnectionProviders } from './db-connection.providers';
import { EnvironmentConfigModule } from '../environment-config/environment-config.module';

@Module({
  imports: [EnvironmentConfigModule],
  providers: [...dbConnectionProviders],
  exports: [...dbConnectionProviders],
})
export class DatabaseModule {}

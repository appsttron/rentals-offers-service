import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DatabaseConfig } from '../db-config/db-config.interface';

@Injectable()
export class EnvironmentConfigService implements DatabaseConfig {
  constructor(private configService: ConfigService) {}

  getDatabaseURL(): string {
    return this.configService.get<string>('DATABASE_URL');
  }

  getApiKey(): string {
    return this.configService.get<string>('API_KEY');
  }

  getRMQUrl(): string {
    return this.configService.get<string>('RMQ_URL');
  }

  getRMQQueueName(): string {
    return this.configService.get<string>('RMQ_QUEUE_NAME');
  }
}

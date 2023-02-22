import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { EnvironmentConfigModule } from './environment-config/environment-config.module';
import { SecurityMiddleware } from './security-config/security.middleware';
import { RentalEntitiesModule } from './rental-entities/rental-entities.module';
import { MockDataModule } from './mock-data/mock-data.module';

@Module({
  imports: [EnvironmentConfigModule, RentalEntitiesModule, MockDataModule],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SecurityMiddleware).forRoutes('/');
  }
}

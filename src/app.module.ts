import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigsModule } from './configs/configs.module';
import { EnvironmentConfigModule } from './environment-config/environment-config.module';
import { SecurityMiddleware } from './security-config/security.middleware';

@Module({
  imports: [EnvironmentConfigModule, ConfigsModule],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SecurityMiddleware).forRoutes('/');
  }
}

import { RentalEntitiesController } from './rental-entities.controller';
import { RentalEntitiesService } from './rental-entities.service';
import { RentalEntitiesDtoMapper } from './rental-entities.dto.mapper';
import { RentalEntitiesMongoRepository } from './rental-entities.mongo.repository';
import { rentalEntitiesProviders } from './rental-entities.provider';
import { DatabaseModule } from '../db-config/database.module';
import {Inject, Module, OnApplicationBootstrap} from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import {rentalsQueueProvider} from "./rentals.queue.provider";
import {ClientProxy} from "@nestjs/microservices";
import {EnvironmentConfigModule} from "../environment-config/environment-config.module";
import {RentalEntitiesQueueController} from "./rental-entities.queue.controller";

@Module({
  imports: [DatabaseModule, HttpModule, EnvironmentConfigModule],
  controllers: [RentalEntitiesController, RentalEntitiesQueueController],
  providers: [
    RentalEntitiesService,
    RentalEntitiesDtoMapper,
    RentalEntitiesMongoRepository,
    ...rentalEntitiesProviders,
    ...rentalsQueueProvider,
  ],
})
export class RentalEntitiesModule implements OnApplicationBootstrap{
  constructor(
      @Inject('RENTALS_QUEUE')
      private readonly rentalsQueue: ClientProxy,
  ) {}
  async onApplicationBootstrap() {
    await this.rentalsQueue.connect();
  }
}

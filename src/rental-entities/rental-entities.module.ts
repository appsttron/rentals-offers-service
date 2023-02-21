import { RentalEntitiesController } from './rental-entities.controller';
import { RentalEntitiesService } from './rental-entities.service';
import { RentalEntitiesDtoMapper } from './rental-entities.dto.mapper';
import { RentalEntitiesMongoRepository } from './rental-entities.mongo.repository';
import { rentalEntitiesProviders } from './rental-entities.provider';
import { DatabaseModule } from '../db-config/database.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [DatabaseModule],
  controllers: [RentalEntitiesController],
  providers: [
    RentalEntitiesService,
    RentalEntitiesDtoMapper,
    RentalEntitiesMongoRepository,
    ...rentalEntitiesProviders,
  ],
})
export class RentalEntitiesModule {}

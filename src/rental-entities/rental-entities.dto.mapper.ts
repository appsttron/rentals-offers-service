import { Injectable } from '@nestjs/common';
import { CreateRentalEntityDto } from './dtos/create-rental-entity.dto';
import { RentalEntity } from './rental-entities.schema';

@Injectable()
export class RentalEntitiesDtoMapper {
  mapCreateRentalEntity(createConfigDto: CreateRentalEntityDto): RentalEntity {
    return {
      ...createConfigDto,
    };
  }
}

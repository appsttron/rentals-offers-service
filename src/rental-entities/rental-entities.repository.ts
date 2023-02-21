import { RentalEntity, RentalEntityDocument } from './rental-entities.schema';

export interface RentalEntitiesRepository {
  create(newConfig: RentalEntity): Promise<RentalEntityDocument>;

  findByPermit(permit: string): Promise<RentalEntityDocument>;

  findAll(): Promise<RentalEntityDocument[]>;

  delete(name: string): Promise<RentalEntityDocument>;

  updateStatus(permit: string, status: string): Promise<RentalEntityDocument>;
}

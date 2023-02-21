import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { RentalEntitiesRepository } from './rental-entities.repository';
import { RentalEntity, RentalEntityDocument } from './rental-entities.schema';

@Injectable()
export class RentalEntitiesMongoRepository implements RentalEntitiesRepository {
  constructor(
    @Inject('RENTAL_ENTITY_MODEL')
    private readonly rentalEntityDocumentModel: Model<RentalEntityDocument>
  ) {}

  async create(newRentalEntity: RentalEntity): Promise<RentalEntityDocument> {
    return this.rentalEntityDocumentModel.create(newRentalEntity);
  }

  async findByPermit(permit: string): Promise<RentalEntityDocument> {
    return this.rentalEntityDocumentModel.findOne({ permit: permit }).exec();
  }

  async findAll(): Promise<RentalEntityDocument[]> {
    return this.rentalEntityDocumentModel.find().exec();
  }

  async delete(name: string): Promise<RentalEntityDocument> {
    return this.rentalEntityDocumentModel
      .findOneAndDelete({ name: name })
      .exec();
  }

  async updateStatus(
    permit: string,
    permit_status: string
  ): Promise<RentalEntityDocument> {
    return this.rentalEntityDocumentModel
      .findOneAndUpdate(
        { permit: permit },
        { permit_status: permit_status },
        { new: true }
      )
      .exec();
  }
}

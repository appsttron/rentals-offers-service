import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRentalEntityDto } from './dtos/create-rental-entity.dto';
import { RentalEntityDocument } from './rental-entities.schema';
import { UpdateRentalEntityStatusDto } from './dtos/update-rental-entity-status.dto';
import { RentalEntitiesDtoMapper } from './rental-entities.dto.mapper';
import { RentalEntitiesMongoRepository } from './rental-entities.mongo.repository';
import { HttpService } from '@nestjs/axios';
import {create} from "domain";

@Injectable()
export class RentalEntitiesService {
  constructor(
    private readonly httpService: HttpService,
    private readonly rentalEntitiesRepository: RentalEntitiesMongoRepository,
    private readonly rentalEntitiesDtoMapper: RentalEntitiesDtoMapper
  ) {}

  async read(): Promise<any> {
    return new Promise( resolve =>
      this.httpService
          .get('https://data.nashville.gov/resource/2z82-v8pm.json').subscribe(async r => {
            // await r.data.map(async (record:CreateRentalEntityDto) => {
            //   let existing = await this.findByPermit(record.permit);
            //   if(existing){
            //     if(existing.permit_status !== record.permit_status){
            //       await this.updateStatus({permit: record.permit, status: record.permit_status});
            //     }
            //   } else{
            //     await this.create(record);
            //   }
            // });
            resolve(r.data);
      })
    );
  }

  async create(
    createRentalEntityDto: CreateRentalEntityDto
  ): Promise<RentalEntityDocument> {
    return this.rentalEntitiesRepository.create(
      this.rentalEntitiesDtoMapper.mapCreateRentalEntity(createRentalEntityDto)
    );
  }

  async findByPermit(permit: string): Promise<RentalEntityDocument> {
    return this.rentalEntitiesRepository.findByPermit(permit);
  }

  async findAll(): Promise<RentalEntityDocument[]> {
    return this.rentalEntitiesRepository.findAll();
  }

  async delete(name: string): Promise<RentalEntityDocument> {
    return this.rentalEntitiesRepository.delete(name);
  }

  async updateStatus(
    updateConfigValueDto: UpdateRentalEntityStatusDto
  ): Promise<RentalEntityDocument> {
    return this.rentalEntitiesRepository
      .updateStatus(updateConfigValueDto.permit, updateConfigValueDto.status)
      .then((result) => {
        if (result) return result;
        else throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
      });
  }
}

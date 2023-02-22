import {HttpException, HttpStatus, Inject, Injectable} from '@nestjs/common';
import { CreateRentalEntityDto } from './dtos/create-rental-entity.dto';
import { RentalEntityDocument } from './rental-entities.schema';
import { UpdateRentalEntityStatusDto } from './dtos/update-rental-entity-status.dto';
import { RentalEntitiesDtoMapper } from './rental-entities.dto.mapper';
import { RentalEntitiesMongoRepository } from './rental-entities.mongo.repository';
import { HttpService } from '@nestjs/axios';
import {ClientProxy} from "@nestjs/microservices";

@Injectable()
export class RentalEntitiesService {
  constructor(
    private readonly httpService: HttpService,
    private readonly rentalEntitiesRepository: RentalEntitiesMongoRepository,
    private readonly rentalEntitiesDtoMapper: RentalEntitiesDtoMapper,
    @Inject('RENTALS_QUEUE')
    private readonly rentalsQueue: ClientProxy,
  ) {}

  async read(url: string): Promise<any> {
    this.rentalsQueue.send('SyncCommand', JSON.stringify({url: url})).subscribe();
  }

  async queueRentalEntity(createRentalEntityDto: CreateRentalEntityDto): Promise<any> {
    this.rentalsQueue.send('CreateRentalEntityDto', JSON.stringify(createRentalEntityDto)).subscribe();
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

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

  async processRentalEntity(createRentalEntityDto: CreateRentalEntityDto): Promise<any> {
    return new Promise( async () => {
      let existing = await this.findByPermit(createRentalEntityDto.permit);
      if (existing) {
        if (existing.permit_status !== createRentalEntityDto.permit_status) {
          await this.updateStatus({permit: createRentalEntityDto.permit, status: createRentalEntityDto.permit_status});
        }
      } else {
        await this.create(createRentalEntityDto);
      }
    });
  }

  async read(): Promise<any> {
    return new Promise( resolve =>
      this.httpService
          .get('http://206.189.197.77:9070/mock-data/pre').subscribe(async r => {
            await r.data.map(async (record:CreateRentalEntityDto) => {
              await this.rentalsQueue.send({typeID:'CreateRentalEntityDto'}, JSON.stringify(record)).subscribe();
            });
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

import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Param,
  Patch,
} from '@nestjs/common';
import { RentalEntitiesService } from './rental-entities.service';
import { RentalEntityDocument } from './rental-entities.schema';
import { CreateRentalEntityDto } from './dtos/create-rental-entity.dto';
import { UpdateRentalEntityStatusDto } from './dtos/update-rental-entity-status.dto';

@Controller('rental-entities')
export class RentalEntitiesController {
  constructor(private readonly rentalEntityService: RentalEntitiesService) {}

  @Get('/read')
  async read() {
    return fetch('https://data.nashville.gov/resource/2z82-v8pm.json').then(
      (res) => console.log(res.body)
    );
  }

  @Post()
  async create(
    @Body() createRentalEntityDto: CreateRentalEntityDto
  ): Promise<RentalEntityDocument> {
    return this.rentalEntityService.create(createRentalEntityDto);
  }

  @Get(':name')
  async findByName(@Param('name') name: string): Promise<RentalEntityDocument> {
    return this.rentalEntityService.findByName(name);
  }

  @Get()
  async findAll(): Promise<RentalEntityDocument[]> {
    return this.rentalEntityService.findAll();
  }

  @Delete(':permit')
  async delete(@Param('permit') permit: string): Promise<RentalEntityDocument> {
    return this.rentalEntityService.delete(permit);
  }

  @Patch()
  async updateValue(
    @Body() updateRentalEntityStatusDto: UpdateRentalEntityStatusDto
  ): Promise<RentalEntityDocument> {
    return this.rentalEntityService.updateValue(updateRentalEntityStatusDto);
  }
}

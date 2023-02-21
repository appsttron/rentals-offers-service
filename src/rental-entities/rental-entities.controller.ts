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
  async read(): Promise<any> {
    return this.rentalEntityService.read();
  }

  @Post()
  async create(
    @Body() createRentalEntityDto: CreateRentalEntityDto
  ): Promise<RentalEntityDocument> {
    return this.rentalEntityService.create(createRentalEntityDto);
  }

  @Get(':permit')
  async findByName(@Param('permit') permit: string): Promise<RentalEntityDocument> {
    return this.rentalEntityService.findByPermit(permit);
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
    return this.rentalEntityService.updateStatus(updateRentalEntityStatusDto);
  }
}

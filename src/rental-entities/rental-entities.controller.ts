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

  @Post('/read')
  async read(@Body() payload: {url: string}): Promise<any> {
    return this.rentalEntityService.read(payload.url);
  }

  @Post('/queue')
  async queueRentalEntity(@Body() createRentalEntityDto: CreateRentalEntityDto): Promise<any> {
    return this.rentalEntityService.queueRentalEntity(createRentalEntityDto);
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

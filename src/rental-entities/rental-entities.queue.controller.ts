import {Controller} from '@nestjs/common';
import { RentalEntitiesService } from './rental-entities.service';
import { CreateRentalEntityDto } from './dtos/create-rental-entity.dto';
import {Ctx, MessagePattern, Payload, RmqContext} from "@nestjs/microservices";

@Controller()
export class RentalEntitiesQueueController {
    constructor(private readonly rentalEntityService: RentalEntitiesService) {}

    @MessagePattern({typeID:'CreateRentalEntityDto'})
    async processRentalEntity(@Payload() data: any,  @Ctx() context: RmqContext): Promise<CreateRentalEntityDto> {
        const result = await this.rentalEntityService.processRentalEntity(JSON.parse(data) as CreateRentalEntityDto);
        const channel = context.getChannelRef();
        const originalMsg = context.getMessage();
        channel.ack(originalMsg);
        return result;
    }
}

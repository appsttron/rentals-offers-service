import { Mongoose } from 'mongoose';
import { RentalEntitySchema } from './rental-entities.schema';

export const rentalEntitiesProviders = [
  {
    provide: 'RENTAL_ENTITY_MODEL',
    useFactory: (mongoose: Mongoose) =>
      mongoose.model('RentalEntity', RentalEntitySchema),
    inject: ['DATABASE_CONNECTION'],
  },
];

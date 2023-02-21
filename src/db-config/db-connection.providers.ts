import * as mongoose from 'mongoose';
import { EnvironmentConfigService } from '../environment-config/environment-config.service';

export const dbConnectionProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    inject: [EnvironmentConfigService],
    useFactory: async (
      config: EnvironmentConfigService
    ): Promise<typeof mongoose> => {
      mongoose.set('strictQuery', false);
      return mongoose.connect(config.getDatabaseURL());
    },
  },
];

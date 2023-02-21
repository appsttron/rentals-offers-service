import { Module } from '@nestjs/common';
import {MockDataController} from "./mock-data.controller";

@Module({
  imports: [],
  controllers: [MockDataController],
  providers: [],
})
export class MockDataModule {}

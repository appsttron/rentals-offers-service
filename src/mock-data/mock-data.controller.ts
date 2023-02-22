import { Controller, Get } from '@nestjs/common';
import PostData from './post-data';
import PreData from './pre-data';

@Controller('mock-data')
export class MockDataController {
  @Get('/pre')
  async pre(): Promise<any> {
    return Promise.resolve(PreData);
  }

  @Get('/post')
  async post(): Promise<any> {
    return Promise.resolve(PostData);
  }
}

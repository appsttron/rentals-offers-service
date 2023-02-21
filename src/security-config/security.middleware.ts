import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, NextFunction } from 'express';
import { EnvironmentConfigService } from '../environment-config/environment-config.service';
import { validateApiKey } from '../utils/validate-api-key';

@Injectable()
export class SecurityMiddleware implements NestMiddleware {
  constructor(private readonly config: EnvironmentConfigService) {}
  use(req: Request, res: Response, next: NextFunction) {
    if(req.url.includes('mock')) next();
    validateApiKey(req.headers['api_key'], this.config.getApiKey(), next);
  }
}

import { HttpException, HttpStatus } from '@nestjs/common';

export const validateApiKey = (
    apiKeyHeader: string | string[],
    apiKey: string,
    callback: () => void
): void => {
    if (apiKeyHeader && apiKey === apiKeyHeader) {
        callback();
    } else {
        throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
};
